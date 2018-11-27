var app = angular.module('ebs2App');
app.controller('bank_masterCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_banks={};
	$scope.payroll_banksList=[];
	var db_payroll_banks={};
	$scope.hrms_employeesList=[];
	$scope.accTypeList=['Current','Savings'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_banksOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_payroll_banks_record = function() {
		if (hid != undefined)
			$scope.payroll_banks['sysid'] = hid;
		$scope.payroll_banks['action'] = 'SELECT_PAYROLL_BANKS';
		db_payroll_banks['trans'] = $scope.payroll_banks;
		db_payroll_banks['proc'] = 'payroll_banksOps';
		$http.post('/db_data',db_payroll_banks).success(function(response){
			if (response.error!='None'){
				$scope.payroll_banks_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_banksList = response.data[0];
				if (hid != undefined){
					$scope.payroll_banks=response.data[0][0];
					$scope.payroll_banks['action'] = 'UPDATE_PAYROLL_BANKS';
				}
				else {
					$scope.payroll_banks['action'] = 'INSERT_PAYROLL_BANKS';
				}
			}
		});
	};
	select_payroll_banks_record();

	$scope.save_payroll_banks_record = function() {
		db_payroll_banks['trans'] = $scope.payroll_banks;
		db_payroll_banks['proc'] = 'payroll_banksOps';
		$http.post('/db_data',db_payroll_banks).success(function(response){
			if (response.error!='None'){
				$scope.payroll_banks_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_banks_status = response.data[0][0].msg;
				$scope.payroll_banks = {};
				db_payroll_banks = {};
				hid = undefined;
				select_payroll_banks_record();
			}
		});
	}

	$scope.delete_payroll_banks_record = function(sysid) {
		$scope.payroll_banks['sysid'] = sysid;
		$scope.payroll_banks['action'] = 'DELETE_PAYROLL_BANKS';
		db_payroll_banks['trans'] = $scope.payroll_banks;
		db_payroll_banks['proc'] = 'payroll_banksOps';
		$http.post('/db_data',db_payroll_banks).success(function(response){
			if (response.error!='None'){
				$scope.payroll_banks_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_banks_status = response.data[0][0].msg;
				$scope.payroll_banks = {};
				db_payroll_banks = {};
				select_payroll_banks_record();
			}
		});
	}

	$scope.insert_payroll_banks_record = function() {
		$scope.payroll_banks = {status: 'Active'}
		$scope.payroll_banks['action'] = 'INSERT_PAYROLL_BANKS';
		hid = undefined;
		$scope.payroll_banks_status = '';
	}

	$scope.update_payroll_banks_record = function(x) {
		$scope.payroll_banks = x;
		$scope.payroll_banks['action'] = 'UPDATE_PAYROLL_BANKS';
		hid = x['sysid'];
		$scope.payroll_banks_status = '';
	}

})