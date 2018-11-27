var app = angular.module('ebs2App');
app.controller('ginvendorCtrl', function ($scope, $http, $routeParams, $location, $rootScope) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_mat_header={trans_type: 'Issue', return_type: 'Returnable', status: 'Prepared', trans_date: moment().format('YYYY-MM-DD')};
	$scope.inv_mat_headerList=[];
	var db_inv_mat_header={};
	$scope.inv_mat_details={};
	$scope.inv_mat_detailsList=[];
	var db_inv_mat_details={};
	$scope.hrms_employeesList=[];
	$scope.admin_deptList=[];
	$scope.inv_supplierList=[];
	$scope.inv_customerList=[];
	$scope.sales_soList=[];
	$scope.inv_item_masterList=[];
	$scope.retTypeList=['Returnable','Non-returnable','Return rejected'];
	var temp_emp_list=[];
	var temp_dept_list=[];
	var temp_item_list=[];
	var can_save=0;
	$scope.can_add=true;
	var det_action='SELECT_INV_MAT_DETAILS';
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_mat_headerOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.admin_deptList=response.data[1];
				$scope.inv_supplierList=response.data[2];
				$scope.inv_customerList=response.data[3];
				$scope.inv_item_masterList=response.data[4];
				$scope.sales_soList=response.data[5];
				temp_emp_list=response.data[0];
				temp_dept_list=response.data[1];
				temp_item_list=response.data[4];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	$scope.filter_emp = function(){
		$scope.hrms_employeesList=_.filter(temp_emp_list,{dept_id: $scope.inv_mat_header['dept_id']});
	}

	var select_inv_mat_header_record = function() {
		if (hid != undefined)
			$scope.inv_mat_header['sysid'] = hid;
		$scope.inv_mat_header['action'] = 'SELECT_INV_MAT_HEADER';
		db_inv_mat_header['trans'] = $scope.inv_mat_header;
		db_inv_mat_header['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_header).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_headerList = response.data[0];
				$scope.inv_mat_detailsList = response.data[1];
				if (hid != undefined){
					$scope.inv_mat_header=response.data[0][0];
				}
			}
		});
	};
	if (hid != undefined)
		select_inv_mat_header_record();

	$scope.save_inv_mat_header_record = function() {
		if (hid != undefined){
			$scope.inv_mat_header['action'] = 'UPDATE_INV_MAT_HEADER';
		}
		else {
			$scope.inv_mat_header['action'] = 'INSERT_INV_MAT_HEADER';
		}
		db_inv_mat_header['trans'] = $scope.inv_mat_header;
		db_inv_mat_header['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_header).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_header_status = response.data[0][0].msg;
				$scope.inv_mat_header['sysid']=response.data[1][0].trans_id;
				$scope.inv_mat_details['hdr_id']=response.data[1][0].trans_id;
				$scope.trans_id=response.data[1][0].trans_id;
			}
		});
	}

	$scope.delete_inv_mat_header_record = function(sysid) {
		$scope.inv_mat_header['sysid'] = sysid;
		$scope.inv_mat_header['action'] = 'DELETE_INV_MAT_HEADER';
		db_inv_mat_header['trans'] = $scope.inv_mat_header;
		db_inv_mat_header['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_header).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_mat_header_status = response.data[0][0].msg;
				$scope.inv_mat_header = {};
				db_inv_mat_header = {};
				select_inv_mat_header_record();
			}
		});
	}

	$scope.insert_inv_mat_header_record = function() {
		$scope.inv_mat_header = {status: 'Active'}
		$scope.inv_mat_header['action'] = 'INSERT_INV_MAT_HEADER';
		hid = undefined;
		$scope.inv_mat_header_status = '';
	}

	$scope.update_inv_mat_header_record = function(x) {
		$scope.inv_mat_header = x;
		$scope.inv_mat_header['action'] = 'UPDATE_INV_MAT_HEADER';
		hid = x['sysid'];
		$scope.inv_mat_header_status = '';
	}

	var select_inv_mat_details_record = function() {
		$scope.inv_mat_details['hdr_id'] = $scope.trans_id;
		$scope.inv_mat_details['action'] = 'SELECT_INV_MAT_DETAILS';
		db_inv_mat_details['trans'] = $scope.inv_mat_details;
		db_inv_mat_details['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_details).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_detailsList = response.data[0];
			}
		});
	};

	$scope.save_inv_mat_details_record = function() {
		if ($scope.trans_id < 1){
			$scope.inv_mat_details_status = 'Please create or select master entry..';
			return;
		}
		$scope.inv_mat_details['action'] = det_action;
		db_inv_mat_details['trans'] = $scope.inv_mat_details;
		db_inv_mat_details['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_details).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_header_status = response.data[0][0].msg;
				$scope.inv_mat_details = {};
				db_inv_mat_details = {};
				select_inv_mat_details_record();
			}
		});
	}

	$scope.delete_inv_mat_details_record = function(sysid, i_id) {
		$scope.inv_mat_details['sysid'] = sysid;
		$scope.inv_mat_details['item_id'] = i_id;
		$scope.inv_mat_details['action'] = 'DELETE_INV_MAT_DETAILS';
		db_inv_mat_details['trans'] = $scope.inv_mat_details;
		db_inv_mat_details['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_details).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_header_status = response.data[0][0].msg;
				$scope.inv_mat_details = {};
				db_inv_mat_details = {};
				select_inv_mat_details_record();
			}
		});
	}

	$scope.insert_inv_mat_details_record = function() {
		console.log($scope.inv_mat_header['sysid']);
		$scope.inv_mat_details = {hdr_id: $scope.inv_mat_header['sysid']};
		det_action='INSERT_INV_MAT_DETAILS';
		$scope.inv_mat_header_status = '';
	}

	$scope.update_inv_mat_details_record = function(x) {
		$scope.inv_mat_details = x;
		det_action = 'UPDATE_INV_MAT_DETAILS';
		$scope.inv_mat_header_status = '';
	}

	$scope.get_op_bal = function() {
		if ($scope.inv_mat_details['item_id']==undefined || $scope.inv_mat_details['item_id']==0)
			return;
		$scope.inv_mat_details['item_uom'] = _.where($scope.inv_item_masterList,{sysid: $scope.inv_mat_details['item_id']})[0]['uom'];
		$scope.inv_mat_details['wt_uom'] = _.where($scope.inv_item_masterList,{sysid: $scope.inv_mat_details['item_id']})[0]['unit_wt_uom'];
		$scope.inv_mat_details['action'] = 'OP_BAL';
		db_inv_mat_details['trans'] = $scope.inv_mat_details;
		db_inv_mat_details['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_details).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_details_status = response.error['sqlMessage'].substring(0,99);
				$scope.can_add=true;
			}
			else if (response.data[0][0]['v_cl_qty']>0 && response.data[0][0]['v_cl_wt']>0){
				$scope.inv_mat_details['op_qty'] = response.data[0][0]['v_cl_qty'];
				$scope.inv_mat_details['op_wt'] = response.data[0][0]['v_cl_wt'];
				$scope.can_add=false;
				$scope.inv_mat_details_status = '';
			}
			else {
				$scope.inv_mat_details_status = response.data[0][0].msg;
				$scope.inv_mat_details['op_qty'] = undefined;
				$scope.inv_mat_details['op_wt'] = undefined;
				$scope.can_add=true;
			}
		});
	}

	$scope.validate_item_qty = function(){
		if ($scope.inv_mat_details['op_qty']<$scope.inv_mat_details['iss_qty']){
			$scope.inv_mat_details_status = 'Insufficient stock. Cannot issue item.';
			$scope.can_add=true;
		}
		else{
			$scope.inv_mat_details['cl_qty']=$scope.inv_mat_details['op_qty']-$scope.inv_mat_details['iss_qty'];
			$scope.inv_mat_details_status = '';
			$scope.can_add=false;
		}
	}

	$scope.validate_item_wt = function(){
		if ($scope.inv_mat_details['op_wt']<$scope.inv_mat_details['iss_wt']){
			$scope.inv_mat_details_status = 'Insufficient stock. Cannot issue item.';
			$scope.can_add=true;
		}
		else{
			$scope.inv_mat_details['cl_wt']=$scope.inv_mat_details['op_wt']-$scope.inv_mat_details['iss_wt'];
			$scope.inv_mat_details_status = '';
			$scope.can_add=false;
		}
	}
})