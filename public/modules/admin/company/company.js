var app = angular.module('ebs2App');
app.controller('companyCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_company={};
	$scope.admin_companyList=[];
	var db_admin_company={};
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_companyOps'};

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

	var select_admin_company_record = function() {
		if (hid != undefined)
			$scope.admin_company['sysid'] = hid;
		$scope.admin_company['action'] = 'SELECT_ADMIN_COMPANY';
		db_admin_company['trans'] = $scope.admin_company;
		db_admin_company['proc'] = 'admin_companyOps';
		$http.post('/db_data',db_admin_company).success(function(response){
			if (response.error!='None'){
				$scope.admin_company_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_companyList = response.data[0];
				if (hid != undefined){
					$scope.admin_company=response.data[0][0];
					$scope.admin_company['action'] = 'UPDATE_ADMIN_COMPANY';
				}
				else {
					$scope.admin_company['action'] = 'INSERT_ADMIN_COMPANY';
				}
			}
		});
	};
	select_admin_company_record();

	$scope.save_admin_company_record = function() {
		db_admin_company['trans'] = $scope.admin_company;
		db_admin_company['proc'] = 'admin_companyOps';
		$http.post('/db_data',db_admin_company).success(function(response){
			if (response.error!='None'){
				$scope.admin_company_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_company_status = response.data[0][0].msg;
				$scope.admin_company = {};
				db_admin_company = {};
				hid = undefined;
				select_admin_company_record();
			}
		});
	}

	$scope.delete_admin_company_record = function(sysid) {
		$scope.admin_company['sysid'] = sysid;
		$scope.admin_company['action'] = 'DELETE_ADMIN_COMPANY';
		db_admin_company['trans'] = $scope.admin_company;
		db_admin_company['proc'] = 'admin_companyOps';
		$http.post('/db_data',db_admin_company).success(function(response){
			if (response.error!='None'){
				$scope.admin_company_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_company_status = response.data[0][0].msg;
				$scope.admin_company = {};
				db_admin_company = {};
				select_admin_company_record();
			}
		});
	}

	$scope.insert_admin_company_record = function() {
		$scope.admin_company = {status: 'Active'}
		$scope.admin_company['action'] = 'INSERT_ADMIN_COMPANY';
		hid = undefined;
		$scope.admin_company_status = '';
	}

	$scope.update_admin_company_record = function(x) {
		$scope.admin_company = x;
		$scope.admin_company['action'] = 'UPDATE_ADMIN_COMPANY';
		hid = x['sysid'];
		$scope.admin_company_status = '';
	}

})