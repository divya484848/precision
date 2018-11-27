var app = angular.module('ebs2App');
app.controller('emp_pay_banksCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.payroll_banks={};
	$scope.payroll_banksList=[];
	var db_payroll_banks={};
	$scope.hrms_employeesList=[];
	$scope.corp_bankList=[];
	$scope.temp={};
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_banksOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.corp_bankList=response.data[1];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_payroll_banks_record = function() {
		$scope.payroll_banks['action'] = 'PAY_CHANNEL';
		db_payroll_banks['trans'] = $scope.payroll_banks;
		db_payroll_banks['proc'] = 'payroll_banksOps';
		$http.post('/db_data',db_payroll_banks).success(function(response){
			if (response.error!='None'){
				$scope.payroll_banks_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
	console.log(response.data);
				$scope.payroll_banksList = response.data[0];
				
			}
		});
	};
	select_payroll_banks_record();

	$scope.update_pay_id = function(rec){
		rec['pay_bank_id']=$scope.payroll_banks['pay_bank_id'];
	}

	$scope.save_payroll_banks_record = function() {
		$scope.payroll_banks['action'] = 'UPDATE_CORP_BANKS';
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