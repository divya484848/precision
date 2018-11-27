var app = angular.module('ebs2App');
app.controller('custlistCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_customer={};
	$scope.inv_customerList=[];
	var db_inv_customer={};
	$scope.admin_currencyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_customerOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_currencyList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_customer_record = function() {
		if (hid != undefined)
			$scope.inv_customer['sysid'] = hid;
		$scope.inv_customer['action'] = 'SELECT_INV_CUSTOMER';
		db_inv_customer['trans'] = $scope.inv_customer;
		db_inv_customer['proc'] = 'inv_customerOps';
		$http.post('/db_data',db_inv_customer).success(function(response){
			if (response.error!='None'){
				$scope.inv_customer_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_customerList = response.data[0];
				if (hid != undefined)
					$scope.inv_customer=response.data[0][0];
				if (hid==undefined)
					$scope.inv_customer['action'] = 'INSERT_INV_CUSTOMER';
				else
					$scope.inv_customer['action'] = 'UPDATE_INV_CUSTOMER';
			}
		});
	};
	select_inv_customer_record();

	$scope.save_inv_customer_record = function() {
		db_inv_customer['trans'] = $scope.inv_customer;
		db_inv_customer['proc'] = 'inv_customerOps';
		$http.post('/db_data',db_inv_customer).success(function(response){
			if (response.error!='None'){
				$scope.inv_customer_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_customer_status = response.data[0][0].msg;
				$scope.inv_customer = {};
				db_inv_customer = {};
				hid = undefined;
				select_inv_customer_record();
			}
		});
	}

	$scope.delete_inv_customer_record = function(sysid) {
		$scope.inv_customer['sysid'] = sysid;
		$scope.inv_customer['action'] = 'DELETE_INV_CUSTOMER';
		db_inv_customer['trans'] = $scope.inv_customer;
		db_inv_customer['proc'] = 'inv_customerOps';
		$http.post('/db_data',db_inv_customer).success(function(response){
			if (response.error!='None'){
				$scope.inv_customer_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_customer_status = response.data[0][0].msg;
				$scope.inv_customer = {};
				db_inv_customer = {};
				select_inv_customer_record();
			}
		});
	}

	$scope.insert_inv_customer_record = function() {
		$scope.inv_customer['action'] = 'INSERT_INV_CUSTOMER';
		$scope.inv_customer = {status: 'Active'}
		hid = undefined;
		$scope.inv_customer_status = '';
	}

	$scope.update_inv_customer_record = function(x) {
		$scope.inv_customer = x;
		$scope.inv_customer['action'] = 'UPDATE_INV_CUSTOMER';
		hid = x['sysid'];
		$scope.inv_customer_status = '';
	}

})