var app = angular.module('ebs2App');
app.controller('leave_policyCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_leave_types_policy={};
	$scope.hrms_leave_types_policyList=[];
	var db_hrms_leave_types_policy={};
	$scope.hrms_leave_typeList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_leave_types_policyOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_leave_typeList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_leave_types_policy_record = function() {
		if (hid != undefined)
			$scope.hrms_leave_types_policy['sysid'] = hid;
		$scope.hrms_leave_types_policy['action'] = 'SELECT_HRMS_LEAVE_TYPES_POLICY';
		db_hrms_leave_types_policy['trans'] = $scope.hrms_leave_types_policy;
		db_hrms_leave_types_policy['proc'] = 'hrms_leave_types_policyOps';
		$http.post('/db_data',db_hrms_leave_types_policy).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_types_policy_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_types_policyList = response.data[0];
				if (hid != undefined){
					$scope.hrms_leave_types_policy=response.data[0][0];
					$scope.hrms_leave_types_policy['action'] = 'UPDATE_HRMS_LEAVE_TYPES_POLICY';
				}
				else {
					$scope.hrms_leave_types_policy['action'] = 'INSERT_HRMS_LEAVE_TYPES_POLICY';
				}
			}
		});
	};
	select_hrms_leave_types_policy_record();

	$scope.save_hrms_leave_types_policy_record = function() {
		db_hrms_leave_types_policy['trans'] = $scope.hrms_leave_types_policy;
		db_hrms_leave_types_policy['proc'] = 'hrms_leave_types_policyOps';
		$http.post('/db_data',db_hrms_leave_types_policy).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_types_policy_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_types_policy_status = response.data[0][0].msg;
				$scope.hrms_leave_types_policy = {};
				db_hrms_leave_types_policy = {};
				hid = undefined;
				select_hrms_leave_types_policy_record();
			}
		});
	}

	$scope.delete_hrms_leave_types_policy_record = function(sysid) {
		$scope.hrms_leave_types_policy['sysid'] = sysid;
		$scope.hrms_leave_types_policy['action'] = 'DELETE_HRMS_LEAVE_TYPES_POLICY';
		db_hrms_leave_types_policy['trans'] = $scope.hrms_leave_types_policy;
		db_hrms_leave_types_policy['proc'] = 'hrms_leave_types_policyOps';
		$http.post('/db_data',db_hrms_leave_types_policy).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_types_policy_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_leave_types_policy_status = response.data[0][0].msg;
				$scope.hrms_leave_types_policy = {};
				db_hrms_leave_types_policy = {};
				select_hrms_leave_types_policy_record();
			}
		});
	}

	$scope.insert_hrms_leave_types_policy_record = function() {
		$scope.hrms_leave_types_policy = {status: 'Active'}
		$scope.hrms_leave_types_policy['action'] = 'INSERT_HRMS_LEAVE_TYPES_POLICY';
		hid = undefined;
		$scope.hrms_leave_types_policy_status = '';
	}

	$scope.update_hrms_leave_types_policy_record = function(x) {
		$scope.hrms_leave_types_policy = x;
		$scope.hrms_leave_types_policy['action'] = 'UPDATE_HRMS_LEAVE_TYPES_POLICY';
		hid = x['sysid'];
		$scope.hrms_leave_types_policy_status = '';
	}

})