var app = angular.module('ebs2App');
app.controller('machine_logCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.hrms_att_machine_log={};
	$scope.hrms_att_machine_logList=[];
	var db_hrms_att_machine_log={};
	$scope.hrms_employeesList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_att_machine_logOps'};

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

	$scope.select_hrms_att_machine_log_record = function() {
		$scope.hrms_att_machine_log['action'] = 'SELECT_HRMS_ATT_MACHINE_LOG';
		db_hrms_att_machine_log['trans'] = $scope.hrms_att_machine_log;
		db_hrms_att_machine_log['proc'] = 'hrms_att_machine_logOps';
		$http.post('/db_data',db_hrms_att_machine_log).success(function(response){
			if (response.error!='None'){
				$scope.hrms_att_machine_log_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_att_machine_logList = response.data[0];
			}
		});
	};
	//$scope.select_hrms_att_machine_log_record();
})