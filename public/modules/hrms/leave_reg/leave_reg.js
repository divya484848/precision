var app = angular.module('ebs2App');
app.controller('leave_regCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_leave_register={};
	$scope.hrms_leave_registerList=[];
	var db_hrms_leave_register={};
	$scope.hrms_employeesList=[];
	$scope.hrms_leave_typeList=[];
	$scope.admin_workflow_masterList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_leave_registerOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.hrms_leave_typeList=response.data[1];
				$scope.admin_workflow_masterList=response.data[2];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_leave_register_record = function() {
		if (hid != undefined)
			$scope.hrms_leave_register['sysid'] = hid;
		$scope.hrms_leave_register['action'] = 'SELECT_HRMS_LEAVE_REGISTER';
		db_hrms_leave_register['trans'] = $scope.hrms_leave_register;
		db_hrms_leave_register['proc'] = 'hrms_leave_registerOps';
		$http.post('/db_data',db_hrms_leave_register).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_register_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_registerList = response.data[0];
				if (hid != undefined){
					$scope.hrms_leave_register=response.data[0][0];
					$scope.hrms_leave_register['action'] = 'UPDATE_HRMS_LEAVE_REGISTER';
				}
				else {
					$scope.hrms_leave_register['action'] = 'INSERT_HRMS_LEAVE_REGISTER';
				}
			}
		});
	};
	select_hrms_leave_register_record();

	$scope.save_hrms_leave_register_record = function() {
		db_hrms_leave_register['trans'] = $scope.hrms_leave_register;
		db_hrms_leave_register['proc'] = 'hrms_leave_registerOps';
		$http.post('/db_data',db_hrms_leave_register).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_register_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_register_status = response.data[0][0].msg;
				$scope.hrms_leave_register = {};
				db_hrms_leave_register = {};
				hid = undefined;
				select_hrms_leave_register_record();
			}
		});
	}

	$scope.delete_hrms_leave_register_record = function(sysid) {
		$scope.hrms_leave_register['sysid'] = sysid;
		$scope.hrms_leave_register['action'] = 'DELETE_HRMS_LEAVE_REGISTER';
		db_hrms_leave_register['trans'] = $scope.hrms_leave_register;
		db_hrms_leave_register['proc'] = 'hrms_leave_registerOps';
		$http.post('/db_data',db_hrms_leave_register).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_register_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_leave_register_status = response.data[0][0].msg;
				$scope.hrms_leave_register = {};
				db_hrms_leave_register = {};
				select_hrms_leave_register_record();
			}
		});
	}

	$scope.insert_hrms_leave_register_record = function() {
		$scope.hrms_leave_register = {status: 'Active'}
		$scope.hrms_leave_register['action'] = 'INSERT_HRMS_LEAVE_REGISTER';
		hid = undefined;
		$scope.hrms_leave_register_status = '';
	}

	$scope.update_hrms_leave_register_record = function(x) {
		$scope.hrms_leave_register = x;
		$scope.hrms_leave_register['action'] = 'UPDATE_HRMS_LEAVE_REGISTER';
		hid = x['sysid'];
		$scope.hrms_leave_register_status = '';
	}

})