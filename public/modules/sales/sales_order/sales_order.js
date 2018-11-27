var app = angular.module('ebs2App');
app.controller('sales_orderCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.sales_so={};
	$scope.sales_soList=[];
	var db_sales_so={};
	$scope.sales_so_details={};
	$scope.sales_so_detailsList=[];
	var db_sales_so_details={};
	$scope.inv_customerList=[];
	$scope.inv_finished_goodsList=[];
	var fg_list=[];
	$scope.soTypeList=['One-time','Recurring','Blanket'];
	$scope.channelList=['Email','Paper-copy','Verbal','Online'];
	$scope.delModeList=['Shipment','Courier','In-person','Outsourced'];
	$scope.statusList=['Prepared','In-process','On-hold','Cancelled','Completed'];
	$scope.duomList=['Percent','Value'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_soOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_customerList=response.data[0];
				$scope.inv_finished_goodsList=response.data[1];
				fg_list=response.data[1];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_sales_so_record = function() {
		if (hid != undefined)
			$scope.sales_so['sysid'] = hid;
		$scope.sales_so['action'] = 'SELECT_SALES_SO';
		db_sales_so['trans'] = $scope.sales_so;
		db_sales_so['proc'] = 'sales_soOps';
		$http.post('/db_data',db_sales_so).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_soList = response.data[0];
				$scope.sales_so_detailsList = response.data[1];
				if (hid != undefined){
					$scope.sales_so=response.data[0][0];
				}
			}
		});
	};
	if (hid != undefined){
		select_sales_so_record();
	}

	$scope.save_sales_so_record = function() {
		if (hid != undefined){
			$scope.sales_so['action'] = 'UPDATE_SALES_SO';
		}
		else {
			$scope.sales_so['action'] = 'INSERT_SALES_SO';
		}
		db_sales_so['trans'] = $scope.sales_so;
		db_sales_so['proc'] = 'sales_soOps';
		$http.post('/db_data',db_sales_so).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_so_status = response.data[0][0].msg;
				$scope.sales_so_details['so_id'] = response.data[1][0].trans_id;
				$scope.trans_id = response.data[1][0].trans_id;
			}
		});
	}

	$scope.delete_sales_so_record = function(sysid) {
		$scope.sales_so['sysid'] = sysid;
		$scope.sales_so['action'] = 'DELETE_SALES_SO';
		db_sales_so['trans'] = $scope.sales_so;
		db_sales_so['proc'] = 'sales_soOps';
		$http.post('/db_data',db_sales_so).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.sales_so_status = response.data[0][0].msg;
				$scope.sales_so = {};
				db_sales_so = {};
				select_sales_so_record();
			}
		});
	}

	$scope.insert_sales_so_record = function() {
		$scope.sales_so = {status: 'Active'}
		$scope.sales_so['action'] = 'INSERT_SALES_SO';
		hid = undefined;
		$scope.sales_so_status = '';
	}

	$scope.update_sales_so_record = function(x) {
		$scope.sales_so = x;
		$scope.sales_so['action'] = 'UPDATE_SALES_SO';
		hid = x['sysid'];
		$scope.sales_so_status = '';
	}

	var select_sales_so_details_record = function() {
		$scope.sales_so_details['so_id'] = $scope.trans_id;
		$scope.sales_so_details['action'] = 'SELECT_SALES_SO_DETAILS';
		db_sales_so_details['trans'] = $scope.sales_so_details;
		db_sales_so_details['proc'] = 'sales_soOps';
		$http.post('/db_data',db_sales_so_details).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_so_detailsList = response.data[0];
				if ($scope.sales_so_detailsList.length>0)
					$scope.sales_so_details=response.data[0][0];
			}
		});
	};

	$scope.save_sales_so_details_record = function() {
		if ($scope.trans_id < 1){
			$scope.sales_so_details_status = 'Please create or select master entry..';
			return;
		}
		db_sales_so_details['trans'] = $scope.sales_so_details;
		db_sales_so_details['proc'] = 'sales_soOps';
		$http.post('/db_data',db_sales_so_details).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_so_details_status = response.data[0][0].msg;
				$scope.sales_so_details = {};
				db_sales_so_details = {};
				select_sales_so_record();
			}
		});
	}

	$scope.delete_sales_so_details_record = function(sysid) {
		$scope.sales_so_details['sysid'] = sysid;
		$scope.sales_so_details['action'] = 'DELETE_SALES_SO_DETAILS';
		db_sales_so_details['trans'] = $scope.sales_so_details;
		db_sales_so_details['proc'] = 'sales_soOps';
		$http.post('/db_data',db_sales_so_details).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.sales_so_details_status = response.data[0][0].msg;
				$scope.sales_so_details = {};
				db_sales_so_details = {};
				select_sales_so_details_record();
			}
		});
	}

	$scope.insert_sales_so_details_record = function() {
		$scope.sales_so_details = {so_id: $scope.sales_so['sysid'], status: 'Active'}
		$scope.sales_so_details['action'] = 'INSERT_SALES_SO_DETAILS';
		$scope.sales_so_details_status = '';
		$scope.inv_finished_goodsList=_.where(fg_list,{cust_id: $scope.sales_so['cust_id']});
	}

	$scope.update_sales_so_details_record = function(x) {
		$scope.sales_so_details = x;
		$scope.sales_so_details['action'] = 'UPDATE_SALES_SO_DETAILS';
		$scope.sales_so_details_status = '';
		$scope.inv_finished_goodsList=_.where(fg_list,{cust_id: $scope.sales_so['cust_id']});
	}

	$scope.get_rate = function(){
		$scope.sales_so_details['unit_rate'] = _.where($scope.inv_finished_goodsList,{sysid: $scope.sales_so_details['item_id']})[0]['unit_rate']; 
	}

	$scope.update_item_value = function(){
		$scope.sales_so_details['item_value'] = $scope.sales_so_details['unit_rate']*$scope.sales_so_details['so_qty']; 
	}

	$scope.update_discount = function(){
		var qty = $scope.sales_so_details['so_qty'];
		var rate = $scope.sales_so_details['unit_rate'];
		var discount = $scope.sales_so_details['discount'];
		var val = qty*rate;
		if ($scope.sales_so_details['discount_uom']=="Percent"){
			$scope.sales_so_details['item_value'] = val-val*discount/100; 
		}
		else{
			$scope.sales_so_details['item_value'] = val-discount; 
		}
	}
})