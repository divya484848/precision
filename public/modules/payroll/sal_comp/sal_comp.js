var app = angular.module('ebs2App');
app.controller('sal_compCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_ctc_comp={};
	$scope.payroll_ctc_compList=[];
	var db_payroll_ctc_comp={};
	$scope.admin_lovList=[];
	$scope.admin_companyList=[];
	$scope.hrms_employeesList=[];
	$scope.typeList=['Earning','Deduction'];
	$scope.approvalList=['No','Yes'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_ctc_compOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_lovList=response.data[0];
				$scope.admin_companyList=response.data[1];
				$scope.hrms_employeesList=response.data[2];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_payroll_ctc_comp_record = function() {
		if (hid != undefined)
			$scope.payroll_ctc_comp['sysid'] = hid;
		$scope.payroll_ctc_comp['action'] = 'SELECT_PAYROLL_CTC_COMP';
		db_payroll_ctc_comp['trans'] = $scope.payroll_ctc_comp;
		db_payroll_ctc_comp['proc'] = 'payroll_ctc_compOps';
		$http.post('/db_data',db_payroll_ctc_comp).success(function(response){
			if (response.error!='None'){
				$scope.payroll_ctc_comp_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_ctc_compList = response.data[0];
				if (hid != undefined){
					$scope.payroll_ctc_comp=response.data[0][0];
					$scope.payroll_ctc_comp['action'] = 'UPDATE_PAYROLL_CTC_COMP';
				}
				else {
					$scope.payroll_ctc_comp['action'] = 'INSERT_PAYROLL_CTC_COMP';
				}
			}
		});
	};
	select_payroll_ctc_comp_record();

	$scope.save_payroll_ctc_comp_record = function() {
		db_payroll_ctc_comp['trans'] = $scope.payroll_ctc_comp;
		db_payroll_ctc_comp['proc'] = 'payroll_ctc_compOps';
		$http.post('/db_data',db_payroll_ctc_comp).success(function(response){
			if (response.error!='None'){
				$scope.payroll_ctc_comp_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_ctc_comp_status = response.data[0][0].msg;
				$scope.payroll_ctc_comp = {};
				db_payroll_ctc_comp = {};
				hid = undefined;
				select_payroll_ctc_comp_record();
			}
		});
	}

	$scope.delete_payroll_ctc_comp_record = function(sysid) {
		$scope.payroll_ctc_comp['sysid'] = sysid;
		$scope.payroll_ctc_comp['action'] = 'DELETE_PAYROLL_CTC_COMP';
		db_payroll_ctc_comp['trans'] = $scope.payroll_ctc_comp;
		db_payroll_ctc_comp['proc'] = 'payroll_ctc_compOps';
		$http.post('/db_data',db_payroll_ctc_comp).success(function(response){
			if (response.error!='None'){
				$scope.payroll_ctc_comp_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_ctc_comp_status = response.data[0][0].msg;
				$scope.payroll_ctc_comp = {};
				db_payroll_ctc_comp = {};
				select_payroll_ctc_comp_record();
			}
		});
	}

	$scope.insert_payroll_ctc_comp_record = function() {
		$scope.payroll_ctc_comp = {status: 'Active'}
		$scope.payroll_ctc_comp['action'] = 'INSERT_PAYROLL_CTC_COMP';
		hid = undefined;
		$scope.payroll_ctc_comp_status = '';
	}

	$scope.update_payroll_ctc_comp_record = function(x) {
		$scope.payroll_ctc_comp = x;
		$scope.payroll_ctc_comp['action'] = 'UPDATE_PAYROLL_CTC_COMP';
		hid = x['sysid'];
		$scope.payroll_ctc_comp_status = '';
	}

})