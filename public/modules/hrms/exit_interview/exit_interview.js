var app = angular.module('ebs2App');
app.controller('exit_interviewCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_emp_exit_interview={};
	$scope.hrms_emp_exit_interviewList=[];
	var db_hrms_emp_exit_interview={};
	$scope.hrms_employeesList=[];
	$scope.hrms_employeesList=[];
	$scope.admin_companyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_emp_exit_interviewOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.hrms_employeesList=response.data[1];
				$scope.admin_companyList=response.data[2];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_emp_exit_interview_record = function() {
		if (hid != undefined)
			$scope.hrms_emp_exit_interview['sysid'] = hid;
		$scope.hrms_emp_exit_interview['action'] = 'SELECT_HRMS_EMP_EXIT_INTERVIEW';
		db_hrms_emp_exit_interview['trans'] = $scope.hrms_emp_exit_interview;
		db_hrms_emp_exit_interview['proc'] = 'hrms_emp_exit_interviewOps';
		$http.post('/db_data',db_hrms_emp_exit_interview).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_exit_interview_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_emp_exit_interviewList = response.data[0];
				if (hid != undefined){
					$scope.hrms_emp_exit_interview=response.data[0][0];
					$scope.hrms_emp_exit_interview['action'] = 'UPDATE_HRMS_EMP_EXIT_INTERVIEW';
				}
				else {
					$scope.hrms_emp_exit_interview['action'] = 'INSERT_HRMS_EMP_EXIT_INTERVIEW';
				}
			}
		});
	};
	select_hrms_emp_exit_interview_record();

	$scope.save_hrms_emp_exit_interview_record = function() {
		db_hrms_emp_exit_interview['trans'] = $scope.hrms_emp_exit_interview;
		db_hrms_emp_exit_interview['proc'] = 'hrms_emp_exit_interviewOps';
		$http.post('/db_data',db_hrms_emp_exit_interview).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_exit_interview_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_emp_exit_interview_status = response.data[0][0].msg;
				$scope.hrms_emp_exit_interview = {};
				db_hrms_emp_exit_interview = {};
				hid = undefined;
				select_hrms_emp_exit_interview_record();
			}
		});
	}

	$scope.delete_hrms_emp_exit_interview_record = function(sysid) {
		$scope.hrms_emp_exit_interview['sysid'] = sysid;
		$scope.hrms_emp_exit_interview['action'] = 'DELETE_HRMS_EMP_EXIT_INTERVIEW';
		db_hrms_emp_exit_interview['trans'] = $scope.hrms_emp_exit_interview;
		db_hrms_emp_exit_interview['proc'] = 'hrms_emp_exit_interviewOps';
		$http.post('/db_data',db_hrms_emp_exit_interview).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_exit_interview_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_emp_exit_interview_status = response.data[0][0].msg;
				$scope.hrms_emp_exit_interview = {};
				db_hrms_emp_exit_interview = {};
				select_hrms_emp_exit_interview_record();
			}
		});
	}

	$scope.insert_hrms_emp_exit_interview_record = function() {
		$scope.hrms_emp_exit_interview = {status: 'Active'}
		$scope.hrms_emp_exit_interview['action'] = 'INSERT_HRMS_EMP_EXIT_INTERVIEW';
		hid = undefined;
		$scope.hrms_emp_exit_interview_status = '';
	}

	$scope.update_hrms_emp_exit_interview_record = function(x) {
		$scope.hrms_emp_exit_interview = x;
		$scope.hrms_emp_exit_interview['action'] = 'UPDATE_HRMS_EMP_EXIT_INTERVIEW';
		hid = x['sysid'];
		$scope.hrms_emp_exit_interview_status = '';
	}

})