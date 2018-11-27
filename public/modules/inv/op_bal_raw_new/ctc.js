var app = angular.module('ebs2App');
app.controller('ctcCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.hrms_employeesList = {};
	$scope.hrms_employees = {};
	var db_hrms_employees = {};
	$scope.admin_companyList = {};
	$scope.admin_company = {};
	var db_admin_company = {};
	$scope.admin_subscriptionList = {};
	$scope.admin_subscription = {};
	var db_admin_subscription = {};
	$scope.payroll_ctc = {};
	$scope.payroll_ctcList = {};
	var db_payroll_ctc = {};
	$scope.payroll_ctcList = {};
	$scope.payroll_ctc = {};
	var db_payroll_ctc = {};
	$scope.payroll_ctc_compList = {};
	$scope.payroll_ctc_comp = {};
	var db_payroll_ctc_comp = {};
	$scope.admin_subscriptionList = {};
	$scope.admin_subscription = {};
	var db_admin_subscription = {};
	$scope.payroll_ctc_details = {};
	$scope.payroll_ctc_detailsList = {};
	var db_payroll_ctc_details = {};

	var selectHrms_employeesRecords = function(){
		$scope.hrms_employees['action'] = 'SELECT';
		db_hrms_employees['trans'] = $scope.hrms_employees;
		db_hrms_employees['proc'] = 'hrms_employeesOps';
		$http.post('/db_data',db_hrms_employees).success(function(response){
			$scope.hrms_employeesList = response.data[0];
		});
	}
	selectHrms_employeesRecords();

	var selectAdmin_companyRecords = function(){
		$scope.admin_company['action'] = 'SELECT';
		db_admin_company['trans'] = $scope.admin_company;
		db_admin_company['proc'] = 'admin_companyOps';
		$http.post('/db_data',db_admin_company).success(function(response){
			$scope.admin_companyList = response.data[0];
		});
	}
	selectAdmin_companyRecords();

	var selectAdmin_subscriptionRecords = function(){
		$scope.admin_subscription['action'] = 'SELECT';
		db_admin_subscription['trans'] = $scope.admin_subscription;
		db_admin_subscription['proc'] = 'admin_subscriptionOps';
		$http.post('/db_data',db_admin_subscription).success(function(response){
			$scope.admin_subscriptionList = response.data[0];
		});
	}
	selectAdmin_subscriptionRecords();

	var selectPayroll_ctcRecords = function(){
		$scope.payroll_ctc['action'] = 'SELECT';
		if (hid!=undefined){
			$scope.payroll_ctc['sys_ctc_id'] = hid;
		}
		db_payroll_ctc['trans'] = $scope.payroll_ctc;
		db_payroll_ctc['proc'] = 'payroll_ctcOps';
		$http.post('/db_data',db_payroll_ctc).success(function(response){
			$scope.payroll_ctcList = response.data[0];
			if (hid!=undefined){
				$scope.payroll_ctc = response.data[0][0];
				$scope.payroll_ctc_detailsList = response.data[1];
				$scope.selectPayroll_ctc_detailsForInsert();
			}
		});
	}

	selectPayroll_ctcRecords();

	$scope.savePayroll_ctcRecords = function(){
		if (hid==undefined)
			$scope.payroll_ctc['action'] = 'INSERT';
		else
			$scope.payroll_ctc['action'] = 'UPDATE';
		db_payroll_ctc['trans'] = $scope.payroll_ctc;
		db_payroll_ctc['proc'] = 'payroll_ctcOps';
		$http.post('/db_data',db_payroll_ctc).success(function(response){
			if (response.error=='None'){
				$scope.payroll_ctc_status = response.data[0][0].msg;
				$scope.payroll_ctc = {};
				selectPayroll_ctcRecords();
			}
		});
	}


	$scope.deletePayroll_ctcRecords = function(sysid){
		$scope.payroll_ctc['action'] = 'DELETE';
		$scope.payroll_ctc['sys_ctc_id'] = sysid;
		db_payroll_ctc['trans'] = $scope.payroll_ctc;
		db_payroll_ctc['proc'] = 'payroll_ctcOps';
		$http.post('/db_data',db_payroll_ctc).success(function(response){
			if (response.error=='None'){
				$scope.payroll_ctc_status = response.data[0][0].msg;
				$scope.payroll_ctc = {};
				selectPayroll_ctcRecords();
			}
		});
	}


	$scope.selectPayroll_ctcForInsert = function(){
		$scope.payroll_ctc = {};
		$scope.payroll_ctc_status = '';
		$scope.payroll_ctc['action'] = 'INSERT';
	}

	$scope.selectPayroll_ctcForUpdate = function(rec){
		$scope.payroll_ctc = rec;
		$scope.payroll_ctc_status = '';
		$scope.payroll_ctc['sys_ctc_id'] = rec['sys_ctc_id'];
		$scope.payroll_ctc['action'] = 'UPDATE';
	}

	var selectPayroll_ctcRecords = function(){
		$scope.payroll_ctc['action'] = 'SELECT';
		db_payroll_ctc['trans'] = $scope.payroll_ctc;
		db_payroll_ctc['proc'] = 'payroll_ctcOps';
		$http.post('/db_data',db_payroll_ctc).success(function(response){
			$scope.payroll_ctcList = response.data[0];
		});
	}
	selectPayroll_ctcRecords();

	var selectPayroll_ctc_compRecords = function(){
		$scope.payroll_ctc_comp['action'] = 'SELECT';
		db_payroll_ctc_comp['trans'] = $scope.payroll_ctc_comp;
		db_payroll_ctc_comp['proc'] = 'payroll_ctc_compOps';
		$http.post('/db_data',db_payroll_ctc_comp).success(function(response){
			$scope.payroll_ctc_compList = response.data[0];
		});
	}
	selectPayroll_ctc_compRecords();

	var selectAdmin_subscriptionRecords = function(){
		$scope.admin_subscription['action'] = 'SELECT';
		db_admin_subscription['trans'] = $scope.admin_subscription;
		db_admin_subscription['proc'] = 'admin_subscriptionOps';
		$http.post('/db_data',db_admin_subscription).success(function(response){
			$scope.admin_subscriptionList = response.data[0];
		});
	}
	selectAdmin_subscriptionRecords();

	$scope.savePayroll_ctc_detailsRecords = function(){
		$scope.payroll_ctc_details[''] = hid;
		db_payroll_ctc_details['trans'] = $scope.payroll_ctc_details;
		db_payroll_ctc_details['proc'] = 'payroll_ctc_detailsOps';
		$http.post('/db_data',db_payroll_ctc_details).success(function(response){
			if (response.error=='None'){
				$scope.payroll_ctc_details_status = response.data[0][0].msg;
				$scope.payroll_ctc_details = {};
				selectPayroll_ctcRecords();
			}
		});
	}


	$scope.deletePayroll_ctc_detailsRecords = function(sysid){
		$scope.payroll_ctc_details['action'] = 'DELETE';
		$scope.payroll_ctc_details['sys_ctc_det_id'] = sysid;
		db_payroll_ctc_details['trans'] = $scope.payroll_ctc_details;
		db_payroll_ctc_details['proc'] = 'payroll_ctc_detailsOps';
		$http.post('/db_data',db_payroll_ctc_details).success(function(response){
			if (response.error=='None'){
				$scope.payroll_ctc_details_status = response.data[0][0].msg;
				$scope.payroll_ctc_details = {};
				selectPayroll_ctc_detailsRecords();
			}
		});
	}


	$scope.selectPayroll_ctc_detailsForInsert = function(){
		$scope.payroll_ctc_details = {};
		$scope.payroll_ctc_details_status = '';
		$scope.payroll_ctc_details['action'] = 'INSERT';
	}

	$scope.selectPayroll_ctc_detailsForUpdate = function(rec){
		$scope.payroll_ctc_details = rec;
		$scope.payroll_ctc_details_status = '';
		$scope.payroll_ctc_details['sys_ctc_det_id'] = rec['sys_ctc_det_id'];
		$scope.payroll_ctc_details['action'] = 'UPDATE';
	}
});