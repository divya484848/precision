var app = angular.module('ebs2App');
app.controller('leave_applCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.hrms_leave_appl={};
	$scope.hrms_leave_applList=[];
	var db_hrms_leave_appl={};
	$scope.hrms_employeesList=[];
	$scope.hrms_leave_typeList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_leave_applOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.hrms_leave_typeList=response.data[1];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_leave_appl_record = function() {
		$scope.hrms_leave_appl['action'] = 'SELECT_HRMS_LEAVE_APPL';
		db_hrms_leave_appl['trans'] = $scope.hrms_leave_appl;
		db_hrms_leave_appl['proc'] = 'hrms_leave_applOps';
		$http.post('/db_data',db_hrms_leave_appl).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_appl_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_applList = response.data[0];
				$scope.hrms_leave_appl['action'] = 'INSERT_HRMS_LEAVE_APPL';
			}
		});
	};
	select_hrms_leave_appl_record();

	$scope.save_hrms_leave_appl_record = function() {
		db_hrms_leave_appl['trans'] = $scope.hrms_leave_appl;
		db_hrms_leave_appl['proc'] = 'hrms_leave_applOps';
		$http.post('/db_data',db_hrms_leave_appl).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_appl_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_appl_status = response.data[0][0].msg;
				$scope.hrms_leave_appl = {};
				db_hrms_leave_appl = {};
				select_hrms_leave_appl_record();
			}
		});
	}

	$scope.delete_hrms_leave_appl_record = function(sysid) {
		$scope.hrms_leave_appl['sysid'] = sysid;
		$scope.hrms_leave_appl['action'] = 'DELETE_HRMS_LEAVE_APPL';
		db_hrms_leave_appl['trans'] = $scope.hrms_leave_appl;
		db_hrms_leave_appl['proc'] = 'hrms_leave_applOps';
		$http.post('/db_data',db_hrms_leave_appl).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_appl_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_leave_appl_status = response.data[0][0].msg;
				$scope.hrms_leave_appl = {};
				db_hrms_leave_appl = {};
				select_hrms_leave_appl_record();
			}
		});
	}

	$scope.insert_hrms_leave_appl_record = function() {
		$scope.hrms_leave_appl = {status: 'Active'}
		$scope.hrms_leave_appl['action'] = 'INSERT_HRMS_LEAVE_APPL';
		$scope.hrms_leave_appl_status = '';
	}

	$scope.update_hrms_leave_appl_record = function(x) {
		$scope.hrms_leave_appl = x;
		$scope.hrms_leave_appl['action'] = 'UPDATE_HRMS_LEAVE_APPL';
		$scope.hrms_leave_appl_status = '';
	}

})