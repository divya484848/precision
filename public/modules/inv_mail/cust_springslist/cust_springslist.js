var app = angular.module('ebs2App');
app.controller('cust_springslistCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_customer_springs={};
	$scope.inv_customer_springsList=[];
	var db_inv_customer_springs={};
	$scope.admin_currencyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_customer_springsOps'};

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

	var select_inv_customer_springs_record = function() {
		if (hid != undefined)
			$scope.inv_customer_springs['sysid'] = hid;
		$scope.inv_customer_springs['action'] = 'SELECT_INV_CUSTOMER';
		db_inv_customer_springs['trans'] = $scope.inv_customer_springs;
		db_inv_customer_springs['proc'] = 'inv_customer_springsOps';
        console.log( db_inv_customer_springs);
		$http.post('/db_data',db_inv_customer_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_customer_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_customer_springsList = response.data[0];
				if (hid != undefined){
					$scope.inv_customer_springs=response.data[0][0];
					$scope.inv_customer_springs['action'] = 'UPDATE_INV_CUSTOMER';
				}
				else {
					$scope.inv_customer_springs['action'] = 'INSERT_INV_CUSTOMER';
				}
			}
		});
	};
	select_inv_customer_springs_record();

	$scope.save_inv_customer_springs_record = function() {
		db_inv_customer_springs['trans'] = $scope.inv_customer_springs;
		db_inv_customer_springs['proc'] = 'inv_customer_springsOps';
		$http.post('/db_data',db_inv_customer_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_customer_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_customer_springs_status = response.data[0][0].msg;
				$scope.inv_customer_springs = {};
				db_inv_customer_springs = {};
				hid = undefined;
				select_inv_customer_springs_record();
			}
		});
	}

	$scope.delete_inv_customer_springs_record = function(sysid) {
		$scope.inv_customer_springs['sysid'] = sysid;
		$scope.inv_customer_springs['action'] = 'DELETE_INV_CUSTOMER';
		db_inv_customer_springs['trans'] = $scope.inv_customer_springs;
		db_inv_customer_springs['proc'] = 'inv_customer_springsOps';
		$http.post('/db_data',db_inv_customer_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_customer_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_customer_springs_status = response.data[0][0].msg;
				$scope.inv_customer_springs = {};
				db_inv_customer_springs = {};
				select_inv_customer_springs_record();
			}
		});
	}

	$scope.insert_inv_customer_springs_record = function() {
		$scope.inv_customer_springs = {status: 'Active'}
		$scope.inv_customer_springs['action'] = 'INSERT_INV_CUSTOMER';
		hid = undefined;
		$scope.inv_customer_springs_status = '';
	}

	$scope.update_inv_customer_springs_record = function(x) {
		$scope.inv_customer_springs = x;
		$scope.inv_customer_springs['action'] = 'UPDATE_INV_CUSTOMER';
		hid = x['sysid'];
		$scope.inv_customer_springs_status = '';
	}

})