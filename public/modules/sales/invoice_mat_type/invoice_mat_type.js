var app = angular.module('ebs2App');
app.controller('invoice_mat_typeCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.sales_mat_type={};
	$scope.sales_mat_typeList=[];
	var db_sales_mat_type={};
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_mat_typeOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_sales_mat_type_record = function() {
		if (hid != undefined)
			$scope.sales_mat_type['sysid'] = hid;
		$scope.sales_mat_type['action'] = 'SELECT_SALES_MAT_TYPE';
		db_sales_mat_type['trans'] = $scope.sales_mat_type;
		db_sales_mat_type['proc'] = 'sales_mat_typeOps';
		$http.post('/db_data',db_sales_mat_type).success(function(response){
			if (response.error!='None'){
				$scope.sales_mat_type_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_mat_typeList = response.data[0];
				if (hid != undefined){
					$scope.sales_mat_type=response.data[0][0];
					$scope.sales_mat_type['action'] = 'UPDATE_SALES_MAT_TYPE';
				}
				else {
					$scope.sales_mat_type['action'] = 'INSERT_SALES_MAT_TYPE';
				}
			}
		});
	};
	select_sales_mat_type_record();

	$scope.save_sales_mat_type_record = function() {
		db_sales_mat_type['trans'] = $scope.sales_mat_type;
		db_sales_mat_type['proc'] = 'sales_mat_typeOps';
		$http.post('/db_data',db_sales_mat_type).success(function(response){
			if (response.error!='None'){
				$scope.sales_mat_type_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_mat_type_status = response.data[0][0].msg;
				$scope.sales_mat_type = {};
				db_sales_mat_type = {};
				hid = undefined;
				select_sales_mat_type_record();
			}
		});
	}

	$scope.delete_sales_mat_type_record = function(sysid) {
		$scope.sales_mat_type['sysid'] = sysid;
		$scope.sales_mat_type['action'] = 'DELETE_SALES_MAT_TYPE';
		db_sales_mat_type['trans'] = $scope.sales_mat_type;
		db_sales_mat_type['proc'] = 'sales_mat_typeOps';
		$http.post('/db_data',db_sales_mat_type).success(function(response){
			if (response.error!='None'){
				$scope.sales_mat_type_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.sales_mat_type_status = response.data[0][0].msg;
				$scope.sales_mat_type = {};
				db_sales_mat_type = {};
				select_sales_mat_type_record();
			}
		});
	}

	$scope.insert_sales_mat_type_record = function() {
		$scope.sales_mat_type = {status: 'Active'}
		$scope.sales_mat_type['action'] = 'INSERT_SALES_MAT_TYPE';
		hid = undefined;
		$scope.sales_mat_type_status = '';
	}

	$scope.update_sales_mat_type_record = function(x) {
		$scope.sales_mat_type = x;
		$scope.sales_mat_type['action'] = 'UPDATE_SALES_MAT_TYPE';
		hid = x['sysid'];
		$scope.sales_mat_type_status = '';
	}

})