var app = angular.module('ebs2App');
app.controller('sal_sheetCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.payroll_sal_master={};
	$scope.payroll_sal_masterList=[];
	var db_payroll_sal_master={};
	$scope.payroll_sal_details={};
	$scope.payroll_sal_detailsList=[];
	var db_payroll_sal_details={};
	$scope.hrms_employeesList=[];
	$scope.admin_reason_codeList=[];
	$scope.admin_companyList=[];
	$scope.payroll_ctc_compList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_sal_masterOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.admin_reason_codeList=response.data[1];
				$scope.admin_companyList=response.data[2];
				$scope.payroll_ctc_compList=response.data[3];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	$scope.select_payroll_sal_master_record = function() {
		$scope.payroll_sal_master['action'] = 'SAL_SHEET';
		db_payroll_sal_master['trans'] = $scope.payroll_sal_master;
		db_payroll_sal_master['proc'] = 'payroll_sal_masterOps';
		$http.post('/db_data',db_payroll_sal_master).success(function(response){
			if (response.error!='None'){
				$scope.payroll_sal_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_sal_masterList = response.data[0];
				$scope.payroll_sal_detailsList = response.data[1];
			}
		});
	};
})