var app = angular.module('ebs2App');
app.controller('emp_fnfCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_emp_fnf={};
	$scope.hrms_emp_fnfList=[];
	var db_hrms_emp_fnf={};
	$scope.hrms_employeesList=[];
	$scope.hrms_employeesList=[];
	$scope.hrms_employeesList=[];
	$scope.admin_companyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_emp_fnfOps'};

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

	var select_hrms_emp_fnf_record = function() {
		if (hid != undefined)
			$scope.hrms_emp_fnf['sysid'] = hid;
		$scope.hrms_emp_fnf['action'] = 'SELECT_HRMS_EMP_FNF';
		db_hrms_emp_fnf['trans'] = $scope.hrms_emp_fnf;
		db_hrms_emp_fnf['proc'] = 'hrms_emp_fnfOps';
		$http.post('/db_data',db_hrms_emp_fnf).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_fnf_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_emp_fnfList = response.data[0];
				if (hid != undefined){
					$scope.hrms_emp_fnf=response.data[0][0];
					$scope.hrms_emp_fnf['action'] = 'UPDATE_HRMS_EMP_FNF';
				}
				else {
					$scope.hrms_emp_fnf['action'] = 'INSERT_HRMS_EMP_FNF';
				}
			}
		});
	};
	select_hrms_emp_fnf_record();

	$scope.save_hrms_emp_fnf_record = function() {
		db_hrms_emp_fnf['trans'] = $scope.hrms_emp_fnf;
		db_hrms_emp_fnf['proc'] = 'hrms_emp_fnfOps';
		$http.post('/db_data',db_hrms_emp_fnf).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_fnf_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_emp_fnf_status = response.data[0][0].msg;
				$scope.hrms_emp_fnf = {};
				db_hrms_emp_fnf = {};
				hid = undefined;
				select_hrms_emp_fnf_record();
			}
		});
	}

	$scope.delete_hrms_emp_fnf_record = function(sysid) {
		$scope.hrms_emp_fnf['sysid'] = sysid;
		$scope.hrms_emp_fnf['action'] = 'DELETE_HRMS_EMP_FNF';
		db_hrms_emp_fnf['trans'] = $scope.hrms_emp_fnf;
		db_hrms_emp_fnf['proc'] = 'hrms_emp_fnfOps';
		$http.post('/db_data',db_hrms_emp_fnf).success(function(response){
			if (response.error!='None'){
				$scope.hrms_emp_fnf_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_emp_fnf_status = response.data[0][0].msg;
				$scope.hrms_emp_fnf = {};
				db_hrms_emp_fnf = {};
				select_hrms_emp_fnf_record();
			}
		});
	}

	$scope.insert_hrms_emp_fnf_record = function() {
		$scope.hrms_emp_fnf = {status: 'Active'}
		$scope.hrms_emp_fnf['action'] = 'INSERT_HRMS_EMP_FNF';
		hid = undefined;
		$scope.hrms_emp_fnf_status = '';
	}

	$scope.update_hrms_emp_fnf_record = function(x) {
		$scope.hrms_emp_fnf = x;
		$scope.hrms_emp_fnf['action'] = 'UPDATE_HRMS_EMP_FNF';
		hid = x['sysid'];
		$scope.hrms_emp_fnf_status = '';
	}

})