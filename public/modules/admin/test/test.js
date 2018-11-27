var app = angular.module('ebs2App');
app.controller('testCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_currency={};
	$scope.admin_currencyList=[];
	var db_admin_currency={};
	$scope.admin_roles={};
	$scope.admin_rolesList=[];
	var db_admin_roles={};
	$scope.admin_companyList=[];
	$scope.statusList=['Active','Inactive'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_currencyOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_companyList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_admin_currency_record = function() {
		if (hid != undefined)
			$scope.admin_currency['sysid'] = hid;
		$scope.admin_currency['action'] = 'SELECT_ADMIN_CURRENCY';
		db_admin_currency['trans'] = $scope.admin_currency;
		db_admin_currency['proc'] = 'admin_currencyOps';
		$http.post('/db_data',db_admin_currency).success(function(response){
			if (response.error!='None'){
				$scope.admin_currency_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_currencyList = response.data[0];
				$scope.admin_rolesList = response.data[1];
				if (hid != undefined){
					$scope.admin_currency=response.data[0][0];
					$scope.admin_currency['action'] = 'UPDATE_ADMIN_CURRENCY';
				}
				else {
					$scope.admin_currency['action'] = 'INSERT_ADMIN_CURRENCY';
				}
			}
		});
	};
	select_admin_currency_record();

	$scope.save_admin_currency_record = function() {
		db_admin_currency['trans'] = $scope.admin_currency;
		db_admin_currency['proc'] = 'admin_currencyOps';
		$http.post('/db_data',db_admin_currency).success(function(response){
			if (response.error!='None'){
				$scope.admin_currency_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_currency_status = response.data[0][0].msg;
				$scope.admin_currency = {};
				db_admin_currency = {};
				hid = undefined;
				select_admin_currency_record();
			}
		});
	}

	$scope.delete_admin_currency_record = function(sysid) {
		$scope.admin_currency['sysid'] = sysid;
		$scope.admin_currency['action'] = 'DELETE_ADMIN_CURRENCY';
		db_admin_currency['trans'] = $scope.admin_currency;
		db_admin_currency['proc'] = 'admin_currencyOps';
		$http.post('/db_data',db_admin_currency).success(function(response){
			if (response.error!='None'){
				$scope.admin_currency_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_currency_status = response.data[0][0].msg;
				$scope.admin_currency = {};
				db_admin_currency = {};
				select_admin_currency_record();
			}
		});
	}

	$scope.insert_admin_currency_record = function() {
		$scope.admin_currency = {status: 'Active'}
		$scope.admin_currency['action'] = 'INSERT_ADMIN_CURRENCY';
		hid = undefined;
		$scope.admin_currency_status = '';
	}

	$scope.update_admin_currency_record = function(x) {
		$scope.admin_currency = x;
		$scope.admin_currency['action'] = 'UPDATE_ADMIN_CURRENCY';
		hid = x['sysid'];
		$scope.admin_currency_status = '';
	}

	var select_admin_roles_record = function() {
		$scope.admin_roles[''] = $scope.trans_id;
		$scope.admin_roles['action'] = 'SELECT_ADMIN_ROLES';
		db_admin_roles['trans'] = $scope.admin_roles;
		db_admin_roles['proc'] = 'admin_rolesOps';
		$http.post('/db_data',db_admin_roles).success(function(response){
			if (response.error!='None'){
				$scope.admin_roles_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_rolesList = response.data[0];
				if ($scope.admin_rolesList.length>0)
					$scope.admin_roles=response.data[0][0];
			}
		});
	};

	$scope.save_admin_roles_record = function() {
		if ($scope.trans_id < 1){
			$scope.admin_roles_status = 'Please create or select master entry..';
			return;
		}
		db_admin_roles['trans'] = $scope.admin_roles;
		db_admin_roles['proc'] = 'admin_rolesOps';
		$http.post('/db_data',db_admin_roles).success(function(response){
			if (response.error!='None'){
				$scope.admin_roles_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_roles_status = response.data[0][0].msg;
				$scope.admin_roles = {};
				db_admin_roles = {};
				select_admin_roles_record();
			}
		});
	}

	$scope.delete_admin_roles_record = function(sysid) {
		$scope.admin_roles['sysid'] = sysid;
		$scope.admin_roles['action'] = 'DELETE_ADMIN_ROLES';
		db_admin_roles['trans'] = $scope.admin_roles;
		db_admin_roles['proc'] = 'admin_rolesOps';
		$http.post('/db_data',db_admin_roles).success(function(response){
			if (response.error!='None'){
				$scope.admin_roles_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_roles_status = response.data[0][0].msg;
				$scope.admin_roles = {};
				db_admin_roles = {};
				select_admin_roles_record();
			}
		});
	}

	$scope.insert_admin_roles_record = function() {
		$scope.admin_roles = {status: 'Active'}
		$scope.admin_roles['action'] = 'INSERT_ADMIN_ROLES';
		hid = undefined;
		$scope.admin_roles_status = '';
	}

	$scope.update_admin_roles_record = function(x) {
		$scope.admin_roles = x;
		$scope.admin_roles['action'] = 'UPDATE_ADMIN_ROLES';
		hid = x['sysid'];
		$scope.admin_roles_status = '';
	}

})