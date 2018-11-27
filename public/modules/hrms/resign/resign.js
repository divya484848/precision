var app = angular.module('ebs2App');
app.controller('resignCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_emp_resign={};
	$scope.hrms_emp_resignList=[];
	var db_hrms_emp_resign={};
	$scope.hrms_employeesList=[];
	$scope.hrms_employeesList=[];
	$scope.hrms_employeesList=[];
	$scope.admin_companyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_emp_resignOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.hrms_employeesList=response.data[1];
				$scope.hrms_employeesList=response.data[2];
				$scope.admin_companyList=response.data[3];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_emp_resign_record = function() {
		if (hid != undefined)
			$scope.hrms_emp_resign['sysid'] = hid;
		$scope.hrms_emp_resign['action'] = 'SELECT_HRMS_EMP_RESIGN';
		db_hrms_emp_resign['trans'] = $scope.hrms_emp_resign;
		db_hrms_emp_resign['proc'] = 'hrms_emp_resignOps';
		$http.post('/db_data',db_hrms_emp_resign).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_resign_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_emp_resignList = response.data[0];
				if (hid != undefined){
					$scope.hrms_emp_resign=response.data[0][0];
					$scope.hrms_emp_resign['action'] = 'UPDATE_HRMS_EMP_RESIGN';
				}
				else {
					$scope.hrms_emp_resign['action'] = 'INSERT_HRMS_EMP_RESIGN';
				}
			}
		});
	};
	select_hrms_emp_resign_record();

	$scope.save_hrms_emp_resign_record = function() {
		db_hrms_emp_resign['trans'] = $scope.hrms_emp_resign;
		db_hrms_emp_resign['proc'] = 'hrms_emp_resignOps';
		$http.post('/db_data',db_hrms_emp_resign).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_resign_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_emp_resign_status = response.data[0][0].msg;
				$scope.hrms_emp_resign = {};
				db_hrms_emp_resign = {};
				hid = undefined;
				select_hrms_emp_resign_record();
			}
		});
	}

	$scope.delete_hrms_emp_resign_record = function(sysid) {
		$scope.hrms_emp_resign['sysid'] = sysid;
		$scope.hrms_emp_resign['action'] = 'DELETE_HRMS_EMP_RESIGN';
		db_hrms_emp_resign['trans'] = $scope.hrms_emp_resign;
		db_hrms_emp_resign['proc'] = 'hrms_emp_resignOps';
		$http.post('/db_data',db_hrms_emp_resign).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_resign_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_emp_resign_status = response.data[0][0].msg;
				$scope.hrms_emp_resign = {};
				db_hrms_emp_resign = {};
				select_hrms_emp_resign_record();
			}
		});
	}

	$scope.insert_hrms_emp_resign_record = function() {
		$scope.hrms_emp_resign = {status: 'Active'}
		$scope.hrms_emp_resign['action'] = 'INSERT_HRMS_EMP_RESIGN';
		hid = undefined;
		$scope.hrms_emp_resign_status = '';
	}

	$scope.update_hrms_emp_resign_record = function(x) {
		$scope.hrms_emp_resign = x;
		$scope.hrms_emp_resign['action'] = 'UPDATE_HRMS_EMP_RESIGN';
		hid = x['sysid'];
		$scope.hrms_emp_resign_status = '';
	}

})