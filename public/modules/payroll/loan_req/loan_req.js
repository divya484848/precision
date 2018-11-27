var app = angular.module('ebs2App');
app.controller('loan_reqCtrl', function ($scope, $http, $routeParams, $location, $rootScope) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_loan_requests={};
	$scope.payroll_loan_requestsList=[];
	var db_payroll_loan_requests={};
	$scope.hrms_employeesList=[];
	$scope.admin_companyList=[];
	$scope.reccList=['No','Yes'];
	$scope.retModeList=['Salary','ECS'];
	$scope.payModeList=['Salary','Bank transfer','Cheque','Cash voucher'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_loan_requestsOps'};
	$scope.can_show=true;

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.admin_companyList=response.data[1];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_payroll_loan_requests_record = function() {
		if (hid != undefined)
			$scope.payroll_loan_requests['sysid'] = hid;
		$scope.payroll_loan_requests['action'] = 'SELECT_PAYROLL_LOAN_REQUESTS';
		db_payroll_loan_requests['trans'] = $scope.payroll_loan_requests;
		db_payroll_loan_requests['proc'] = 'payroll_loan_requestsOps';
		$http.post('/db_data',db_payroll_loan_requests).success(function(response){
			if (response.error!='None'){
				$scope.payroll_loan_requests_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_loan_requestsList = response.data[0];
				if (hid != undefined){
					$scope.payroll_loan_requests=response.data[0][0];
					$scope.payroll_loan_requests['action'] = 'UPDATE_PAYROLL_LOAN_REQUESTS';
				}
				else {
					$scope.payroll_loan_requests['action'] = 'INSERT_PAYROLL_LOAN_REQUESTS';
				}
			}
		});
	};
	select_payroll_loan_requests_record();

	$scope.save_payroll_loan_requests_record = function() {
		db_payroll_loan_requests['trans'] = $scope.payroll_loan_requests;
		db_payroll_loan_requests['proc'] = 'payroll_loan_requestsOps';
		$http.post('/db_data',db_payroll_loan_requests).success(function(response){
			if (response.error!='None'){
				$scope.payroll_loan_requests_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_loan_requests_status = response.data[0][0].msg;
				$scope.payroll_loan_requests = {};
				db_payroll_loan_requests = {};
				hid = undefined;
				select_payroll_loan_requests_record();
			}
		});
	}

	$scope.delete_payroll_loan_requests_record = function(sysid) {
		$scope.payroll_loan_requests['sysid'] = sysid;
		$scope.payroll_loan_requests['action'] = 'DELETE_PAYROLL_LOAN_REQUESTS';
		db_payroll_loan_requests['trans'] = $scope.payroll_loan_requests;
		db_payroll_loan_requests['proc'] = 'payroll_loan_requestsOps';
		$http.post('/db_data',db_payroll_loan_requests).success(function(response){
			if (response.error!='None'){
				$scope.payroll_loan_requests_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_loan_requests_status = response.data[0][0].msg;
				$scope.payroll_loan_requests = {};
				db_payroll_loan_requests = {};
				select_payroll_loan_requests_record();
			}
		});
	}

	$scope.insert_payroll_loan_requests_record = function() {
		$scope.payroll_loan_requests = 
			{
				emp_id: $rootScope.logged_user_details[0]['sysid'], 
				emp_name: $rootScope.logged_user_details[0]['complete_name'],
				status: 'Applied'
			}
		$scope.payroll_loan_requests['action'] = 'INSERT_PAYROLL_LOAN_REQUESTS';
		hid = undefined;
		$scope.payroll_loan_requests_status = '';
		$scope.can_show=true;
	}

	$scope.update_payroll_loan_requests_record = function(x) {
		$scope.payroll_loan_requests = x;
		$scope.payroll_loan_requests['action'] = 'UPDATE_PAYROLL_LOAN_REQUESTS';
		hid = x['sysid'];
		$scope.payroll_loan_requests_status = '';
		$scope.can_show=false;
	}

})