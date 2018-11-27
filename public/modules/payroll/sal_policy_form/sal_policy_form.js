var app = angular.module('ebs2App');
app.controller('sal_policy_formCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_sal_policies={};
	$scope.payroll_sal_policiesList=[];
	var db_payroll_sal_policies={};
	$scope.hrms_employeesList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_sal_policiesOps'};

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

	var select_payroll_sal_policies_record = function() {
		if (hid != undefined)
			$scope.payroll_sal_policies['sysid'] = hid;
		$scope.payroll_sal_policies['action'] = 'SELECT_PAYROLL_SAL_POLICIES';
		db_payroll_sal_policies['trans'] = $scope.payroll_sal_policies;
		db_payroll_sal_policies['proc'] = 'payroll_sal_policiesOps';
		$http.post('/db_data',db_payroll_sal_policies).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_policies_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_sal_policiesList = response.data[0];
				if (hid != undefined){
					$scope.payroll_sal_policies=response.data[0][0];
				}
			}
		});
	};
	if (hid != undefined){
		select_payroll_sal_policies_record();
	}

	$scope.save_payroll_sal_policies_record = function() {
		if (hid != undefined){
			$scope.payroll_sal_policies['action'] = 'UPDATE_PAYROLL_SAL_POLICIES';
		}
		else {
			$scope.payroll_sal_policies['action'] = 'INSERT_PAYROLL_SAL_POLICIES';
		}
		db_payroll_sal_policies['trans'] = $scope.payroll_sal_policies;
		db_payroll_sal_policies['proc'] = 'payroll_sal_policiesOps';
		$http.post('/db_data',db_payroll_sal_policies).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_policies_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_sal_policies_status = response.data[0][0].msg;
				if (hid != undefined){
					$scope.payroll_sal_policies['sysid'] = response.data[1][0].trans_id;
				}
				$scope.payroll_sal_policies = {};
				db_payroll_sal_policies = {};
				hid = undefined;
				select_payroll_sal_policies_record();
			}
		});
	}

	$scope.delete_payroll_sal_policies_record = function(sysid) {
		$scope.payroll_sal_policies['sysid'] = sysid;
		$scope.payroll_sal_policies['action'] = 'DELETE_PAYROLL_SAL_POLICIES';
		db_payroll_sal_policies['trans'] = $scope.payroll_sal_policies;
		db_payroll_sal_policies['proc'] = 'payroll_sal_policiesOps';
		$http.post('/db_data',db_payroll_sal_policies).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_policies_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_sal_policies_status = response.data[0][0].msg;
				$scope.payroll_sal_policies = {};
				db_payroll_sal_policies = {};
				select_payroll_sal_policies_record();
			}
		});
	}

	$scope.insert_payroll_sal_policies_record = function() {
		$scope.payroll_sal_policies = {status: 'Active'}
		$scope.payroll_sal_policies['action'] = 'INSERT_PAYROLL_SAL_POLICIES';
		hid = undefined;
		$scope.payroll_sal_policies_status = '';
	}

	$scope.update_payroll_sal_policies_record = function(x) {
		$scope.payroll_sal_policies = x;
		$scope.payroll_sal_policies['action'] = 'UPDATE_PAYROLL_SAL_POLICIES';
		hid = x['sysid'];
		$scope.payroll_sal_policies_status = '';
	}

})