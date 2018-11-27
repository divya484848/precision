var app = angular.module('ebs2App');
app.controller('sal_slip_printCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_sal_master={};
	$scope.payroll_sal_masterList=[];
	var db_payroll_sal_master={};
	$scope.payroll_sal_details={};
	$scope.payroll_sal_detailsList=[];
	var db_payroll_sal_details={};
	$scope.hrms_employeesList=[];
	$scope.admin_reason_codeList=[];
	$scope.admin_companyList=[];
	$scope.payroll_sal_masterList=[];
	$scope.payroll_ctc_compList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_sal_masterOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.admin_reason_codeList=response.data[1];
				$scope.admin_companyList=response.data[2];
				$scope.payroll_sal_masterList=response.data[3];
				$scope.payroll_ctc_compList=response.data[4];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_payroll_sal_master_record = function() {
		if (hid != undefined)
			$scope.payroll_sal_master['sysid'] = hid;
		$scope.payroll_sal_master['action'] = 'SELECT_PAYROLL_SAL_MASTER';
		db_payroll_sal_master['trans'] = $scope.payroll_sal_master;
		db_payroll_sal_master['proc'] = 'payroll_sal_masterOps';
		$http.post('/db_data',db_payroll_sal_master).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_sal_masterList = response.data[0];
				$scope.payroll_sal_detailsList = response.data[1];
				if (hid != undefined){
					$scope.payroll_sal_master=response.data[0][0];
					$scope.payroll_sal_master['action'] = 'UPDATE_PAYROLL_SAL_MASTER';
				}
				else {
					$scope.payroll_sal_master['action'] = 'INSERT_PAYROLL_SAL_MASTER';
				}
			}
		});
	};
	select_payroll_sal_master_record();

	$scope.save_payroll_sal_master_record = function() {
		db_payroll_sal_master['trans'] = $scope.payroll_sal_master;
		db_payroll_sal_master['proc'] = 'payroll_sal_masterOps';
		$http.post('/db_data',db_payroll_sal_master).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_sal_master_status = response.data[0][0].msg;
				$scope.payroll_sal_master = {};
				db_payroll_sal_master = {};
				hid = undefined;
				select_payroll_sal_master_record();
			}
		});
	}

	$scope.delete_payroll_sal_master_record = function(sysid) {
		$scope.payroll_sal_master['sysid'] = sysid;
		$scope.payroll_sal_master['action'] = 'DELETE_PAYROLL_SAL_MASTER';
		db_payroll_sal_master['trans'] = $scope.payroll_sal_master;
		db_payroll_sal_master['proc'] = 'payroll_sal_masterOps';
		$http.post('/db_data',db_payroll_sal_master).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_sal_master_status = response.data[0][0].msg;
				$scope.payroll_sal_master = {};
				db_payroll_sal_master = {};
				select_payroll_sal_master_record();
			}
		});
	}

	$scope.insert_payroll_sal_master_record = function() {
		$scope.payroll_sal_master = {status: 'Active'}
		$scope.payroll_sal_master['action'] = 'INSERT_PAYROLL_SAL_MASTER';
		hid = undefined;
		$scope.payroll_sal_master_status = '';
	}

	$scope.update_payroll_sal_master_record = function(x) {
		$scope.payroll_sal_master = x;
		$scope.payroll_sal_master['action'] = 'UPDATE_PAYROLL_SAL_MASTER';
		hid = x['sysid'];
		$scope.payroll_sal_master_status = '';
	}

	var select_payroll_sal_details_record = function() {
		$scope.payroll_sal_details['sal_master_id'] = $scope.trans_id;
		$scope.payroll_sal_details['action'] = 'SELECT_PAYROLL_SAL_DETAILS';
		db_payroll_sal_details['trans'] = $scope.payroll_sal_details;
		db_payroll_sal_details['proc'] = 'payroll_sal_detailsOps';
		$http.post('/db_data',db_payroll_sal_details).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_sal_detailsList = response.data[0];
				if ($scope.payroll_sal_detailsList.length>0)
					$scope.payroll_sal_details=response.data[0][0];
			}
		});
	};

	$scope.save_payroll_sal_details_record = function() {
		if ($scope.trans_id < 1){
			$scope.payroll_sal_details_status = 'Please create or select master entry..';
			return;
		}
		db_payroll_sal_details['trans'] = $scope.payroll_sal_details;
		db_payroll_sal_details['proc'] = 'payroll_sal_detailsOps';
		$http.post('/db_data',db_payroll_sal_details).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_sal_details_status = response.data[0][0].msg;
				$scope.payroll_sal_details = {};
				db_payroll_sal_details = {};
				select_payroll_sal_details_record();
			}
		});
	}

	$scope.delete_payroll_sal_details_record = function(sysid) {
		$scope.payroll_sal_details['sysid'] = sysid;
		$scope.payroll_sal_details['action'] = 'DELETE_PAYROLL_SAL_DETAILS';
		db_payroll_sal_details['trans'] = $scope.payroll_sal_details;
		db_payroll_sal_details['proc'] = 'payroll_sal_detailsOps';
		$http.post('/db_data',db_payroll_sal_details).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_sal_details_status = response.data[0][0].msg;
				$scope.payroll_sal_details = {};
				db_payroll_sal_details = {};
				select_payroll_sal_details_record();
			}
		});
	}

	$scope.insert_payroll_sal_details_record = function() {
		$scope.payroll_sal_details = {status: 'Active'}
		$scope.payroll_sal_details['action'] = 'INSERT_PAYROLL_SAL_DETAILS';
		hid = undefined;
		$scope.payroll_sal_details_status = '';
	}

	$scope.update_payroll_sal_details_record = function(x) {
		$scope.payroll_sal_details = x;
		$scope.payroll_sal_details['action'] = 'UPDATE_PAYROLL_SAL_DETAILS';
		hid = x['sysid'];
		$scope.payroll_sal_details_status = '';
	}

	$scope.doPrint = function(){
		window.print();
	}


})