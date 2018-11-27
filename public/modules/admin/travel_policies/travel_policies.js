var app = angular.module('ebs2App');
app.controller('travel_policiesCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_travel_policies={};
	$scope.admin_travel_policiesList=[];
	var db_admin_travel_policies={};
	$scope.hrms_employeesList=[];
	$scope.hrms_employeesList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_travel_policiesOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.hrms_employeesList=response.data[1];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_admin_travel_policies_record = function() {
		if (hid != undefined)
			$scope.admin_travel_policies['sysid'] = hid;
		$scope.admin_travel_policies['action'] = 'SELECT_ADMIN_TRAVEL_POLICIES';
		db_admin_travel_policies['trans'] = $scope.admin_travel_policies;
		db_admin_travel_policies['proc'] = 'admin_travel_policiesOps';
		$http.post('/db_data',db_admin_travel_policies).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_policies_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_travel_policiesList = response.data[0];
				if (hid != undefined){
					$scope.admin_travel_policies=response.data[0][0];
					$scope.admin_travel_policies['action'] = 'UPDATE_ADMIN_TRAVEL_POLICIES';
				}
				else {
					$scope.admin_travel_policies['action'] = 'INSERT_ADMIN_TRAVEL_POLICIES';
				}
			}
		});
	};
	select_admin_travel_policies_record();

	$scope.save_admin_travel_policies_record = function() {
		db_admin_travel_policies['trans'] = $scope.admin_travel_policies;
		db_admin_travel_policies['proc'] = 'admin_travel_policiesOps';
		$http.post('/db_data',db_admin_travel_policies).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_policies_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_travel_policies_status = response.data[0][0].msg;
				$scope.admin_travel_policies = {};
				db_admin_travel_policies = {};
				hid = undefined;
				select_admin_travel_policies_record();
			}
		});
	}

	$scope.delete_admin_travel_policies_record = function(sysid) {
		$scope.admin_travel_policies['sysid'] = sysid;
		$scope.admin_travel_policies['action'] = 'DELETE_ADMIN_TRAVEL_POLICIES';
		db_admin_travel_policies['trans'] = $scope.admin_travel_policies;
		db_admin_travel_policies['proc'] = 'admin_travel_policiesOps';
		$http.post('/db_data',db_admin_travel_policies).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_policies_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_travel_policies_status = response.data[0][0].msg;
				$scope.admin_travel_policies = {};
				db_admin_travel_policies = {};
				select_admin_travel_policies_record();
			}
		});
	}

	$scope.insert_admin_travel_policies_record = function() {
		$scope.admin_travel_policies = {status: 'Active'}
		$scope.admin_travel_policies['action'] = 'INSERT_ADMIN_TRAVEL_POLICIES';
		hid = undefined;
		$scope.admin_travel_policies_status = '';
	}

	$scope.update_admin_travel_policies_record = function(x) {
		$scope.admin_travel_policies = x;
		$scope.admin_travel_policies['action'] = 'UPDATE_ADMIN_TRAVEL_POLICIES';
		hid = x['sysid'];
		$scope.admin_travel_policies_status = '';
	}

})