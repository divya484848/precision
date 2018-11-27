var app = angular.module('ebs2App');
app.controller('pay_cycleCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_pay_cycle={};
	$scope.payroll_pay_cycleList=[];
	var db_payroll_pay_cycle={};
	$scope.admin_companyList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_pay_cycleOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_companyList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_payroll_pay_cycle_record = function() {
		if (hid != undefined)
			$scope.payroll_pay_cycle['sysid'] = hid;
		$scope.payroll_pay_cycle['action'] = 'SELECT_PAYROLL_PAY_CYCLE';
		db_payroll_pay_cycle['trans'] = $scope.payroll_pay_cycle;
		db_payroll_pay_cycle['proc'] = 'payroll_pay_cycleOps';
		$http.post('/db_data',db_payroll_pay_cycle).success(function(response){
			if (response.error!='None'){
				$scope.payroll_pay_cycle_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_pay_cycleList = response.data[0];
				if (hid != undefined){
					$scope.payroll_pay_cycle=response.data[0][0];
					$scope.payroll_pay_cycle['action'] = 'UPDATE_PAYROLL_PAY_CYCLE';
				}
				else {
					$scope.payroll_pay_cycle['action'] = 'INSERT_PAYROLL_PAY_CYCLE';
				}
			}
		});
	};
	select_payroll_pay_cycle_record();

	$scope.save_payroll_pay_cycle_record = function() {
		db_payroll_pay_cycle['trans'] = $scope.payroll_pay_cycle;
		db_payroll_pay_cycle['proc'] = 'payroll_pay_cycleOps';
		$http.post('/db_data',db_payroll_pay_cycle).success(function(response){
			if (response.error!='None'){
				$scope.payroll_pay_cycle_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_pay_cycle_status = response.data[0][0].msg;
				$scope.payroll_pay_cycle = {};
				db_payroll_pay_cycle = {};
				hid = undefined;
				select_payroll_pay_cycle_record();
			}
		});
	}

	$scope.delete_payroll_pay_cycle_record = function(sysid) {
		$scope.payroll_pay_cycle['sysid'] = sysid;
		$scope.payroll_pay_cycle['action'] = 'DELETE_PAYROLL_PAY_CYCLE';
		db_payroll_pay_cycle['trans'] = $scope.payroll_pay_cycle;
		db_payroll_pay_cycle['proc'] = 'payroll_pay_cycleOps';
		$http.post('/db_data',db_payroll_pay_cycle).success(function(response){
			if (response.error!='None'){
				$scope.payroll_pay_cycle_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_pay_cycle_status = response.data[0][0].msg;
				$scope.payroll_pay_cycle = {};
				db_payroll_pay_cycle = {};
				select_payroll_pay_cycle_record();
			}
		});
	}

	$scope.insert_payroll_pay_cycle_record = function() {
		$scope.payroll_pay_cycle = {status: 'Active'}
		$scope.payroll_pay_cycle['action'] = 'INSERT_PAYROLL_PAY_CYCLE';
		hid = undefined;
		$scope.payroll_pay_cycle_status = '';
	}

	$scope.update_payroll_pay_cycle_record = function(x) {
		$scope.payroll_pay_cycle = x;
		$scope.payroll_pay_cycle['action'] = 'UPDATE_PAYROLL_PAY_CYCLE';
		hid = x['sysid'];
		$scope.payroll_pay_cycle_status = '';
	}

})