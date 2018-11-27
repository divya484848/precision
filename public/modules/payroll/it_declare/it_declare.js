var app = angular.module('ebs2App');
app.controller('it_declareCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.payroll_it_declaration={};
	$scope.payroll_it_declarationList=[];
	var db_payroll_it_declaration={};
	$scope.hrms_employeesList=[];
	$scope.payroll_it_sectionList=[];
	$scope.payroll_it_section_detailsList=[];
	$scope.admin_companyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'payroll_it_declarationOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.payroll_it_sectionList=response.data[1];
				$scope.payroll_it_section_detailsList=response.data[2];
				$scope.admin_companyList=response.data[3];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_payroll_it_declaration_record = function() {
		if (hid != undefined)
			$scope.payroll_it_declaration['sysid'] = hid;
		$scope.payroll_it_declaration['action'] = 'SELECT_PAYROLL_IT_DECLARATION';
		db_payroll_it_declaration['trans'] = $scope.payroll_it_declaration;
		db_payroll_it_declaration['proc'] = 'payroll_it_declarationOps';
		$http.post('/db_data',db_payroll_it_declaration).success(function(response){
			if (response.error!='None'){
				$scope.payroll_it_declaration_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_it_declarationList = response.data[0];
				if (hid != undefined){
					$scope.payroll_it_declaration=response.data[0][0];
					$scope.payroll_it_declaration['action'] = 'UPDATE_PAYROLL_IT_DECLARATION';
				}
				else {
					$scope.payroll_it_declaration['action'] = 'INSERT_PAYROLL_IT_DECLARATION';
				}
			}
		});
	};
	select_payroll_it_declaration_record();

	$scope.save_payroll_it_declaration_record = function() {
		db_payroll_it_declaration['trans'] = $scope.payroll_it_declaration;
		db_payroll_it_declaration['proc'] = 'payroll_it_declarationOps';
		$http.post('/db_data',db_payroll_it_declaration).success(function(response){
			if (response.error!='None'){
				$scope.payroll_it_declaration_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.payroll_it_declaration_status = response.data[0][0].msg;
				$scope.payroll_it_declaration = {};
				db_payroll_it_declaration = {};
				hid = undefined;
				select_payroll_it_declaration_record();
			}
		});
	}

	$scope.delete_payroll_it_declaration_record = function(sysid) {
		$scope.payroll_it_declaration['sysid'] = sysid;
		$scope.payroll_it_declaration['action'] = 'DELETE_PAYROLL_IT_DECLARATION';
		db_payroll_it_declaration['trans'] = $scope.payroll_it_declaration;
		db_payroll_it_declaration['proc'] = 'payroll_it_declarationOps';
		$http.post('/db_data',db_payroll_it_declaration).success(function(response){
			if (response.error!='None'){
				$scope.payroll_it_declaration_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.payroll_it_declaration_status = response.data[0][0].msg;
				$scope.payroll_it_declaration = {};
				db_payroll_it_declaration = {};
				select_payroll_it_declaration_record();
			}
		});
	}

	$scope.insert_payroll_it_declaration_record = function() {
		$scope.payroll_it_declaration = {status: 'Submitted'}
		$scope.payroll_it_declaration['action'] = 'INSERT_PAYROLL_IT_DECLARATION';
		hid = undefined;
		$scope.payroll_it_declaration_status = '';
	}

	$scope.update_payroll_it_declaration_record = function(x) {
		$scope.payroll_it_declaration = x;
		$scope.payroll_it_declaration['action'] = 'UPDATE_PAYROLL_IT_DECLARATION';
		hid = x['sysid'];
		$scope.payroll_it_declaration_status = '';
	}

})