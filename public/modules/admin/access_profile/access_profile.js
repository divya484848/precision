var app = angular.module('ebs2App');
app.controller('access_profileCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_access_profile={};
	$scope.admin_access_profileList=[];
	var db_admin_access_profile={};
	$scope.admin_companyList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_access_profileOps'};

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

	var select_admin_access_profile_record = function() {
		if (hid != undefined)
			$scope.admin_access_profile['sysid'] = hid;
		$scope.admin_access_profile['action'] = 'SELECT_ADMIN_ACCESS_PROFILE';
		db_admin_access_profile['trans'] = $scope.admin_access_profile;
		db_admin_access_profile['proc'] = 'admin_access_profileOps';
		$http.post('/db_data',db_admin_access_profile).success(function(response){
			if (response.error!='None'){
				$scope.admin_access_profile_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_access_profileList = response.data[0];
				if (hid != undefined){
					$scope.admin_access_profile=response.data[0][0];
					$scope.admin_access_profile['action'] = 'UPDATE_ADMIN_ACCESS_PROFILE';
				}
				else {
					$scope.admin_access_profile['action'] = 'INSERT_ADMIN_ACCESS_PROFILE';
				}
			}
		});
	};
	select_admin_access_profile_record();

	$scope.save_admin_access_profile_record = function() {
		db_admin_access_profile['trans'] = $scope.admin_access_profile;
		db_admin_access_profile['proc'] = 'admin_access_profileOps';
		$http.post('/db_data',db_admin_access_profile).success(function(response){
			if (response.error!='None'){
				$scope.admin_access_profile_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_access_profile_status = response.data[0][0].msg;
				$scope.admin_access_profile = {};
				db_admin_access_profile = {};
				hid = undefined;
				select_admin_access_profile_record();
			}
		});
	}

	$scope.delete_admin_access_profile_record = function(sysid) {
		$scope.admin_access_profile['sysid'] = sysid;
		$scope.admin_access_profile['action'] = 'DELETE_ADMIN_ACCESS_PROFILE';
		db_admin_access_profile['trans'] = $scope.admin_access_profile;
		db_admin_access_profile['proc'] = 'admin_access_profileOps';
		$http.post('/db_data',db_admin_access_profile).success(function(response){
			if (response.error!='None'){
				$scope.admin_access_profile_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_access_profile_status = response.data[0][0].msg;
				$scope.admin_access_profile = {};
				db_admin_access_profile = {};
				select_admin_access_profile_record();
			}
		});
	}

	$scope.insert_admin_access_profile_record = function() {
		$scope.admin_access_profile = {status: 'Active'}
		$scope.admin_access_profile['action'] = 'INSERT_ADMIN_ACCESS_PROFILE';
		hid = undefined;
		$scope.admin_access_profile_status = '';
	}

	$scope.update_admin_access_profile_record = function(x) {
		$scope.admin_access_profile = x;
		$scope.admin_access_profile['action'] = 'UPDATE_ADMIN_ACCESS_PROFILE';
		hid = x['sysid'];
		$scope.admin_access_profile_status = '';
	}

})