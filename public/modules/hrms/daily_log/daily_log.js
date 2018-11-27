var app = angular.module('ebs2App');
app.controller('daily_logCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.hrms_att_daily_log={};
	$scope.hrms_att_daily_logList=[];
	var db_hrms_att_daily_log={};
	$scope.hrms_employeesList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_att_daily_logOps'};

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

	$scope.select_hrms_att_daily_log_record = function() {
		$scope.hrms_att_daily_log['action'] = 'SELECT_HRMS_ATT_DAILY_LOG';
		db_hrms_att_daily_log['trans'] = $scope.hrms_att_daily_log;
		db_hrms_att_daily_log['proc'] = 'hrms_att_daily_logOps';
		$http.post('/db_data',db_hrms_att_daily_log).success(function(response){
			if (response.error!='None'){
				$scope.hrms_att_daily_log_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_att_daily_logList = response.data[0];
			}
		});
	};
})