var app = angular.module('ebs2App');
app.controller('resign_checklistCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_emp_resign_checklist={};
	$scope.hrms_emp_resign_checklistList=[];
	var db_hrms_emp_resign_checklist={};
	$scope.hrms_employeesList=[];
	$scope.admin_deptList=[];
	$scope.hrms_employeesList=[];
	$scope.admin_companyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_emp_resign_checklistOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.admin_deptList=response.data[1];
				$scope.hrms_employeesList=response.data[2];
				$scope.admin_companyList=response.data[3];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_emp_resign_checklist_record = function() {
		if (hid != undefined)
			$scope.hrms_emp_resign_checklist['sysid'] = hid;
		$scope.hrms_emp_resign_checklist['action'] = 'SELECT_HRMS_EMP_RESIGN_CHECKLIST';
		db_hrms_emp_resign_checklist['trans'] = $scope.hrms_emp_resign_checklist;
		db_hrms_emp_resign_checklist['proc'] = 'hrms_emp_resign_checklistOps';
		$http.post('/db_data',db_hrms_emp_resign_checklist).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_resign_checklist_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_emp_resign_checklistList = response.data[0];
				if (hid != undefined){
					$scope.hrms_emp_resign_checklist=response.data[0][0];
					$scope.hrms_emp_resign_checklist['action'] = 'UPDATE_HRMS_EMP_RESIGN_CHECKLIST';
				}
				else {
					$scope.hrms_emp_resign_checklist['action'] = 'INSERT_HRMS_EMP_RESIGN_CHECKLIST';
				}
			}
		});
	};
	select_hrms_emp_resign_checklist_record();

	$scope.save_hrms_emp_resign_checklist_record = function() {
		db_hrms_emp_resign_checklist['trans'] = $scope.hrms_emp_resign_checklist;
		db_hrms_emp_resign_checklist['proc'] = 'hrms_emp_resign_checklistOps';
		$http.post('/db_data',db_hrms_emp_resign_checklist).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_resign_checklist_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_emp_resign_checklist_status = response.data[0][0].msg;
				$scope.hrms_emp_resign_checklist = {};
				db_hrms_emp_resign_checklist = {};
				hid = undefined;
				select_hrms_emp_resign_checklist_record();
			}
		});
	}

	$scope.delete_hrms_emp_resign_checklist_record = function(sysid) {
		$scope.hrms_emp_resign_checklist['sysid'] = sysid;
		$scope.hrms_emp_resign_checklist['action'] = 'DELETE_HRMS_EMP_RESIGN_CHECKLIST';
		db_hrms_emp_resign_checklist['trans'] = $scope.hrms_emp_resign_checklist;
		db_hrms_emp_resign_checklist['proc'] = 'hrms_emp_resign_checklistOps';
		$http.post('/db_data',db_hrms_emp_resign_checklist).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_resign_checklist_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_emp_resign_checklist_status = response.data[0][0].msg;
				$scope.hrms_emp_resign_checklist = {};
				db_hrms_emp_resign_checklist = {};
				select_hrms_emp_resign_checklist_record();
			}
		});
	}

	$scope.insert_hrms_emp_resign_checklist_record = function() {
		$scope.hrms_emp_resign_checklist = {status: 'Active'}
		$scope.hrms_emp_resign_checklist['action'] = 'INSERT_HRMS_EMP_RESIGN_CHECKLIST';
		hid = undefined;
		$scope.hrms_emp_resign_checklist_status = '';
	}

	$scope.update_hrms_emp_resign_checklist_record = function(x) {
		$scope.hrms_emp_resign_checklist = x;
		$scope.hrms_emp_resign_checklist['action'] = 'UPDATE_HRMS_EMP_RESIGN_CHECKLIST';
		hid = x['sysid'];
		$scope.hrms_emp_resign_checklist_status = '';
	}

})