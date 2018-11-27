var app = angular.module('ebs2App');
app.controller('vendor_billCtrl', function ($scope, $http, $routeParams, $location) {
	
	$scope.inv_ledger_view={};
	$scope.inv_ledger_viewList=[];
	var db_inv_ledger_view={};

	$scope.hrms_employeesList = [];
	$scope.admin_deptList = [];
	$scope.inv_supplierList = [];
	$scope.inv_supp_processList = [];

	var db_input = {};

	var ref_data = function() {
		$scope.inv_ledger_view['action'] = 'REF_COST_LEDGER';
		db_inv_ledger_view['trans'] = $scope.inv_ledger_view;
		db_inv_ledger_view['proc'] = 'inv_ledger_viewOps';
		$http.post('/db_data',db_inv_ledger_view).success(function(response){
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_employeesList = response.data[0];
				$scope.admin_deptList = response.data[1];
				$scope.inv_supplierList = response.data[2];
				$scope.inv_supp_processList = response.data[3];
			}
		});
	};
	ref_data();

	
	$scope.select_inv_ledger_view_record = function() {
		$scope.inv_ledger_view['action'] = 'COST_LEDGER';
		db_inv_ledger_view['trans'] = $scope.inv_ledger_view;
		db_inv_ledger_view['proc'] = 'inv_ledger_viewOps';
		$http.post('/db_data',db_inv_ledger_view).success(function(response){
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				var r_data = response.data[0];
console.log(r_data);
				if ($scope.inv_ledger_view['emp_name'] != undefined)
					r_data = _.where(r_data,{emp_id: $scope.inv_ledger_view['emp_name']});
				if ($scope.inv_ledger_view['dept_name'] != undefined)
					r_data = _.where(r_data,{dept_id: $scope.inv_ledger_view['dept_name']});
				if ($scope.inv_ledger_view['supp_name'] != undefined)
					r_data = _.where(r_data,{supp_id: $scope.inv_ledger_view['supp_name']});
				if ($scope.inv_ledger_view['proc_name'] != undefined)
					r_data = _.where(r_data,{process_id: $scope.inv_ledger_view['proc_name']});
				$scope.inv_ledger_viewList = r_data;
			}
		});
	};

	$scope.generate_report = function() {
		$scope.inv_ledger_view_status = '';
		db_input['data'] = $scope.inv_ledger_viewList;
		db_input['report'] = {name: 'vendorbill'};
		$http.post('/db_report',db_input).success(function(response){
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_ledger_view_status = 'Report generated..';
			}
		});
	};
})