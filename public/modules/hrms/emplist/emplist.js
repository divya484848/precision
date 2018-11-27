var app = angular.module('ebs2App');
app.controller('emplistCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_employees={};
	$scope.hrms_employeesList=[];
	var db_hrms_employees={};
	$scope.admin_companyList=[];
	$scope.admin_deptList=[];
	$scope.admin_rolesList=[];
	$scope.hrms_employeesList=[];
	$scope.hrms_emp_gradeList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_employeesOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_companyList=response.data[0];
				$scope.admin_deptList=response.data[1];
				$scope.admin_rolesList=response.data[2];
		//		$scope.hrms_employeesList=response.data[3];
				$scope.hrms_emp_gradeList=response.data[3];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_employees_record = function() {
		if (hid != undefined)
			$scope.hrms_employees['sysid'] = hid;
		$scope.hrms_employees['action'] = 'SELECT_HRMS_EMPLOYEES';
		db_hrms_employees['trans'] = $scope.hrms_employees;
		db_hrms_employees['proc'] = 'hrms_employeesOps';
		$http.post('/db_data',db_hrms_employees).success(function(response){
			if (response.error!='None'){
				$scope.hrms_employees_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_employeesList = response.data[0];
				if (hid != undefined){
					$scope.hrms_employees=response.data[0][0];
					$scope.hrms_employees['action'] = 'UPDATE_HRMS_EMPLOYEES';
				}
				else {
					$scope.hrms_employees['action'] = 'INSERT_HRMS_EMPLOYEES';
				}
			}
		});
	};
	select_hrms_employees_record();

	$scope.save_hrms_employees_record = function() {
		db_hrms_employees['trans'] = $scope.hrms_employees;
		db_hrms_employees['proc'] = 'hrms_employeesOps';
		$http.post('/db_data',db_hrms_employees).success(function(response){
			if (response.error!='None'){
				$scope.hrms_employees_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_employees_status = response.data[0][0].msg;
				$scope.hrms_employees = {};
				db_hrms_employees = {};
				hid = undefined;
				select_hrms_employees_record();
			}
		});
	}

	$scope.delete_hrms_employees_record = function(sysid) {
		$scope.hrms_employees['sysid'] = sysid;
		$scope.hrms_employees['action'] = 'DELETE_HRMS_EMPLOYEES';
		db_hrms_employees['trans'] = $scope.hrms_employees;
		db_hrms_employees['proc'] = 'hrms_employeesOps';
		$http.post('/db_data',db_hrms_employees).success(function(response){
			if (response.error!='None'){
				$scope.hrms_employees_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_employees_status = response.data[0][0].msg;
				$scope.hrms_employees = {};
				db_hrms_employees = {};
				select_hrms_employees_record();
			}
		});
	}

	$scope.insert_hrms_employees_record = function() {
		$scope.hrms_employees = {status: 'Active'}
		$scope.hrms_employees['action'] = 'INSERT_HRMS_EMPLOYEES';
		hid = undefined;
		$scope.hrms_employees_status = '';
	}

	$scope.update_hrms_employees_record = function(x) {
		$scope.hrms_employees = x;
		$scope.hrms_employees['action'] = 'UPDATE_HRMS_EMPLOYEES';
		hid = x['sysid'];
		$scope.hrms_employees_status = '';
	}

})