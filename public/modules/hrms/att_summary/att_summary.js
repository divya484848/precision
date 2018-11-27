var app = angular.module('ebs2App');
app.controller('att_summaryCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.hrms_att_summary={};
	$scope.hrms_att_summaryList=[];
	var db_hrms_att_summary={};
	$scope.hrms_employeesList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_att_daily_detailsOps'};

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
	
	$scope.select_hrms_att_summary_record = function() {
		$scope.hrms_att_summary['action'] = 'SELECT_HRMS_ATT_SUMMARY';
		db_hrms_att_summary['trans'] = $scope.hrms_att_summary;
		db_hrms_att_summary['proc'] = 'hrms_att_summaryOps';
		$http.post('/db_data',db_hrms_att_summary).success(function(response){
			if (response.error!='None'){
				$scope.hrms_att_summary_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_att_summaryList = response.data[0];
			}
		});
	};
})