var app = angular.module('ebs2App');
app.controller('daily_detailsCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.hrms_att_daily_details={};
	$scope.hrms_att_daily_detailsList=[];
	var db_hrms_att_daily_details={};
	$scope.hrms_employeesList=[];
	$scope.admin_deptList=[];
	$scope.hrms_shift_masterList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_att_daily_detailsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.admin_deptList=response.data[1];
				$scope.hrms_shift_masterList=response.data[2];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();
	

	$scope.select_hrms_att_daily_details_record = function() {
		$scope.hrms_att_daily_details['action'] = 'SELECT_HRMS_ATT_DAILY_DETAILS';
		db_hrms_att_daily_details['trans'] = $scope.hrms_att_daily_details;
		db_hrms_att_daily_details['proc'] = 'hrms_att_daily_detailsOps';
		$http.post('/db_data',db_hrms_att_daily_details).success(function(response){
			if (response.error!='None'){
				$scope.hrms_att_daily_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_att_daily_detailsList = response.data[0];
			}
		});
	};
	
	$scope.select_rec = function(x){
		$scope.hrms_att_daily_details = x;
	}
})