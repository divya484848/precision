var app = angular.module('ebs2App');
app.controller('user_accountsCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_user_accounts={};
	$scope.admin_user_accountsList=[];
	var db_admin_user_accounts={};
	$scope.admin_access_profileList=[];
	$scope.admin_companyList=[];
	$scope.hrms_employeesList=[];
	$scope.pwdPolicyList=['No updates','Change quaterly','Temporary'];
	$scope.loginChangeList=['No','Yes'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_user_accountsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_companyList=response.data[0];
				$scope.admin_access_profileList=response.data[1];
				$scope.hrms_employeesList=response.data[2];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_admin_user_accounts_record = function() {
		if (hid != undefined)
			$scope.admin_user_accounts['sysid'] = hid;
		$scope.admin_user_accounts['action'] = 'SELECT_ADMIN_USER_ACCOUNTS';
		db_admin_user_accounts['trans'] = $scope.admin_user_accounts;
		db_admin_user_accounts['proc'] = 'admin_user_accountsOps';
		$http.post('/db_data',db_admin_user_accounts).success(function(response){
			if (response.error!='None'){
				$scope.admin_user_accounts_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_user_accountsList = response.data[0];
				if (hid != undefined){
					$scope.admin_user_accounts=response.data[0][0];
					$scope.admin_user_accounts['action'] = 'UPDATE_ADMIN_USER_ACCOUNTS';
				}
				else {
					$scope.admin_user_accounts['action'] = 'INSERT_ADMIN_USER_ACCOUNTS';
				}
			}
		});
	};
	select_admin_user_accounts_record();

	$scope.save_admin_user_accounts_record = function() {
		db_admin_user_accounts['trans'] = $scope.admin_user_accounts;
		db_admin_user_accounts['proc'] = 'admin_user_accountsOps';
		$http.post('/db_data',db_admin_user_accounts).success(function(response){
			if (response.error!='None'){
				$scope.admin_user_accounts_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_user_accounts_status = response.data[0][0].msg;
				$scope.admin_user_accounts = {};
				db_admin_user_accounts = {};
				hid = undefined;
				select_admin_user_accounts_record();
			}
		});
	}

	$scope.delete_admin_user_accounts_record = function(sysid) {
		$scope.admin_user_accounts['sysid'] = sysid;
		$scope.admin_user_accounts['action'] = 'DELETE_ADMIN_USER_ACCOUNTS';
		db_admin_user_accounts['trans'] = $scope.admin_user_accounts;
		db_admin_user_accounts['proc'] = 'admin_user_accountsOps';
		$http.post('/db_data',db_admin_user_accounts).success(function(response){
			if (response.error!='None'){
				$scope.admin_user_accounts_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_user_accounts_status = response.data[0][0].msg;
				$scope.admin_user_accounts = {};
				db_admin_user_accounts = {};
				select_admin_user_accounts_record();
			}
		});
	}

	$scope.insert_admin_user_accounts_record = function() {
		$scope.admin_user_accounts = {status: 'Active'}
		$scope.admin_user_accounts['action'] = 'INSERT_ADMIN_USER_ACCOUNTS';
		hid = undefined;
		$scope.admin_user_accounts_status = '';
	}

	$scope.update_admin_user_accounts_record = function(x) {
		$scope.admin_user_accounts = x;
		$scope.admin_user_accounts['action'] = 'UPDATE_ADMIN_USER_ACCOUNTS';
		hid = x['sysid'];
		$scope.admin_user_accounts_status = '';
	}

})