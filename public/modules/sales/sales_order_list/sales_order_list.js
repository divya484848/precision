var app = angular.module('ebs2App');
app.controller('sales_order_listCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.sales_so={};
	$scope.sales_soList=[];
	var db_sales_so={};
	$scope.inv_customerList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_soOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_customerList=response.data[0];
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
				if (hid != undefined){
					$scope.sales_so=response.data[0][0];
					$scope.sales_so['action'] = 'UPDATE_SALES_SO';
				}
				else {
					$scope.sales_so['action'] = 'INSERT_SALES_SO';
				}
			}
		});
	};
	select_sales_so_record();

	$scope.save_sales_so_record = function() {
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
				hid = undefined;
				select_sales_so_record();
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

})