var app = angular.module('ebs2App');
app.controller('ctc_listCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_ctc={};
	$scope.payroll_ctcList=[];
	var db_payroll_ctc={};
	$scope.hrms_employeesList=[];
	$scope.admin_companyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_ctcOps'};

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

	var select_payroll_ctc_record = function() {
		if (hid != undefined)
			$scope.payroll_ctc['sysid'] = hid;
		$scope.payroll_ctc['action'] = 'SELECT_PAYROLL_CTC';
		db_payroll_ctc['trans'] = $scope.payroll_ctc;
		db_payroll_ctc['proc'] = 'payroll_ctcOps';
		$http.post('/db_data',db_payroll_ctc).success(function(response){
			if (response.error!='None'){
				$scope.payroll_ctc_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_ctcList = response.data[0];
				if (hid != undefined){
					$scope.payroll_ctc=response.data[0][0];
					$scope.payroll_ctc['action'] = 'UPDATE_PAYROLL_CTC';
				}
				else {
					$scope.payroll_ctc['action'] = 'INSERT_PAYROLL_CTC';
				}
			}
		});
	};
	select_payroll_ctc_record();

	$scope.save_payroll_ctc_record = function() {
		db_payroll_ctc['trans'] = $scope.payroll_ctc;
		db_payroll_ctc['proc'] = 'payroll_ctcOps';
		$http.post('/db_data',db_payroll_ctc).success(function(response){
			if (response.error!='None'){
				$scope.payroll_ctc_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_ctc_status = response.data[0][0].msg;
				$scope.payroll_ctc = {};
				db_payroll_ctc = {};
				hid = undefined;
				select_payroll_ctc_record();
			}
		});
	}

	$scope.delete_payroll_ctc_record = function(sysid) {
		$scope.payroll_ctc['sysid'] = sysid;
		$scope.payroll_ctc['action'] = 'DELETE_PAYROLL_CTC';
		db_payroll_ctc['trans'] = $scope.payroll_ctc;
		db_payroll_ctc['proc'] = 'payroll_ctcOps';
		$http.post('/db_data',db_payroll_ctc).success(function(response){
			if (response.error!='None'){
				$scope.payroll_ctc_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_ctc_status = response.data[0][0].msg;
				$scope.payroll_ctc = {};
				db_payroll_ctc = {};
				select_payroll_ctc_record();
			}
		});
	}

	$scope.insert_payroll_ctc_record = function() {
		$scope.payroll_ctc = {status: 'Active'}
		$scope.payroll_ctc['action'] = 'INSERT_PAYROLL_CTC';
		hid = undefined;
		$scope.payroll_ctc_status = '';
	}

	$scope.update_payroll_ctc_record = function(x) {
		$scope.payroll_ctc = x;
		$scope.payroll_ctc['action'] = 'UPDATE_PAYROLL_CTC';
		hid = x['sysid'];
		$scope.payroll_ctc_status = '';
	}

})