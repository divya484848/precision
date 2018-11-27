var app = angular.module('ebs2App');
app.controller('advance_reqCtrl', function ($scope, $http, $routeParams, $location, $rootScope) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_advances_requests={};
	$scope.payroll_advances_requestsList=[];
	var db_payroll_advances_requests={};
	$scope.hrms_employeesList=[];
	$scope.admin_companyList=[];
	$scope.recModeList=['No','Yes'];
	$scope.retModeList=['Salary','Ad-hoc'];
	$scope.payModeList=['Salary','Ad-hoc','Ban transfer','Cash'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_advances_requestsOps'};
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

	var select_payroll_advances_requests_record = function() {
		if (hid != undefined)
			$scope.payroll_advances_requests['sysid'] = hid;
		$scope.payroll_advances_requests['action'] = 'SELECT_PAYROLL_ADVANCES_REQUESTS';
		db_payroll_advances_requests['trans'] = $scope.payroll_advances_requests;
		db_payroll_advances_requests['proc'] = 'payroll_advances_requestsOps';
		$http.post('/db_data',db_payroll_advances_requests).success(function(response){
			if (response.error!='None'){
				$scope.payroll_advances_requests_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_advances_requestsList = response.data[0];
				if (hid != undefined){
					$scope.payroll_advances_requests=response.data[0][0];
					$scope.payroll_advances_requests['action'] = 'UPDATE_PAYROLL_ADVANCES_REQUESTS';
				}
				else {
					$scope.payroll_advances_requests['action'] = 'INSERT_PAYROLL_ADVANCES_REQUESTS';
				}
			}
		});
	};
	select_payroll_advances_requests_record();

	$scope.save_payroll_advances_requests_record = function() {
		db_payroll_advances_requests['trans'] = $scope.payroll_advances_requests;
		db_payroll_advances_requests['proc'] = 'payroll_advances_requestsOps';
		$http.post('/db_data',db_payroll_advances_requests).success(function(response){
			if (response.error!='None'){
				$scope.payroll_advances_requests_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_advances_requests_status = response.data[0][0].msg;
				$scope.payroll_advances_requests = {};
				db_payroll_advances_requests = {};
				hid = undefined;
				select_payroll_advances_requests_record();
			}
		});
	}

	$scope.delete_payroll_advances_requests_record = function(sysid) {
		$scope.payroll_advances_requests['sysid'] = sysid;
		$scope.payroll_advances_requests['action'] = 'DELETE_PAYROLL_ADVANCES_REQUESTS';
		db_payroll_advances_requests['trans'] = $scope.payroll_advances_requests;
		db_payroll_advances_requests['proc'] = 'payroll_advances_requestsOps';
		$http.post('/db_data',db_payroll_advances_requests).success(function(response){
			if (response.error!='None'){
				$scope.payroll_advances_requests_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_advances_requests_status = response.data[0][0].msg;
				$scope.payroll_advances_requests = {};
				db_payroll_advances_requests = {};
				select_payroll_advances_requests_record();
			}
		});
	}

	$scope.insert_payroll_advances_requests_record = function() {
		$scope.payroll_advances_requests = 
			{
				emp_id: $rootScope.logged_user_details[0]['sysid'], 
				emp_name: $rootScope.logged_user_details[0]['complete_name'],
				status: 'Applied',
				req_date: moment().format('YYYY-MM-DD')
			}
		$scope.payroll_advances_requests['action'] = 'INSERT_PAYROLL_ADVANCES_REQUESTS';
		hid = undefined;
		$scope.payroll_advances_requests_status = '';
		$scope.can_show=true;
	}

	$scope.update_payroll_advances_requests_record = function(x) {
		$scope.payroll_advances_requests = x;
		$scope.payroll_advances_requests['action'] = 'UPDATE_PAYROLL_ADVANCES_REQUESTS';
		hid = x['sysid'];
		$scope.payroll_advances_requests_status = '';
		$scope.can_show=false;
	}

})