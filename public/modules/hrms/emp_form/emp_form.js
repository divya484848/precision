var app = angular.module('ebs2App');
app.controller('emp_formCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_employees={};
	$scope.hrms_employeesList=[];
	var db_hrms_employees={};
	$scope.admin_access_profileList=[];
	$scope.hrms_emp_gradeList=[];
	$scope.admin_companyList=[];
	$scope.admin_deptList=[];
	$scope.salList=['Mr.','Mrs','Ms','Dr.'];
	$scope.genderList=['Male','Female'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_employeesOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_access_profileList=response.data[0];
				$scope.hrms_emp_gradeList=response.data[1];
				$scope.admin_companyList=response.data[2];
				$scope.admin_deptList=response.data[3];
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
				}
			}
		});
	};
	if (hid != undefined){
		select_hrms_employees_record();
	}

	$scope.save_hrms_employees_record = function() {
		if (hid != undefined){
			$scope.hrms_employees['action'] = 'UPDATE_HRMS_EMPLOYEES';
		}
		else {
			$scope.hrms_employees['action'] = 'INSERT_HRMS_EMPLOYEES';
		}
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

	$scope.update_complete_name = function(){
		var fname = '';
		var mname = '';
		var lname = '';
		console.log($scope.hrms_employees['first_name']);
		if ($scope.hrms_employees['first_name']==undefined|| $scope.hrms_employees['first_name']=='')
			fname='';
		else 
			fname = $scope.hrms_employees['first_name']+' ';
		if ($scope.hrms_employees['middle_name']==undefined || $scope.hrms_employees['middle_name']=='')
			mname='';
		else 
			mname = $scope.hrms_employees['first_name']+' ';
		if ($scope.hrms_employees['last_name']==undefined || $scope.hrms_employees['last_name']=='')
			lname='';
		else 
			lname = $scope.hrms_employees['last_name']+' ';
		console.log(fname+mname+lname);
		$scope.hrms_employees['complete_name'] = (fname+mname+lname).trim();
	}

})