var app = angular.module('ebs2App');
app.controller('holidayCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_holiday={};
	$scope.hrms_holidayList=[];
	var db_hrms_holiday={};
	$scope.chooseList=['No','Yes'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_holidayOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_holiday_record = function() {
		if (hid != undefined)
			$scope.hrms_holiday['sysid'] = hid;
		$scope.hrms_holiday['action'] = 'SELECT_HRMS_HOLIDAY';
		db_hrms_holiday['trans'] = $scope.hrms_holiday;
		db_hrms_holiday['proc'] = 'hrms_holidayOps';
		$http.post('/db_data',db_hrms_holiday).success(function(response){
			if (response.error!='None'){
				$scope.hrms_holiday_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_holidayList = response.data[0];
				if (hid != undefined){
					$scope.hrms_holiday=response.data[0][0];
					$scope.hrms_holiday['action'] = 'UPDATE_HRMS_HOLIDAY';
				}
				else {
					$scope.hrms_holiday['action'] = 'INSERT_HRMS_HOLIDAY';
				}
			}
		});
	};
	select_hrms_holiday_record();

	$scope.save_hrms_holiday_record = function() {
		db_hrms_holiday['trans'] = $scope.hrms_holiday;
		db_hrms_holiday['proc'] = 'hrms_holidayOps';
		$http.post('/db_data',db_hrms_holiday).success(function(response){
			if (response.error!='None'){
				$scope.hrms_holiday_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_holiday_status = response.data[0][0].msg;
				$scope.hrms_holiday = {};
				db_hrms_holiday = {};
				hid = undefined;
				select_hrms_holiday_record();
			}
		});
	}

	$scope.delete_hrms_holiday_record = function(sysid) {
		$scope.hrms_holiday['sysid'] = sysid;
		$scope.hrms_holiday['action'] = 'DELETE_HRMS_HOLIDAY';
		db_hrms_holiday['trans'] = $scope.hrms_holiday;
		db_hrms_holiday['proc'] = 'hrms_holidayOps';
		$http.post('/db_data',db_hrms_holiday).success(function(response){
			if (response.error!='None'){
				$scope.hrms_holiday_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_holiday_status = response.data[0][0].msg;
				$scope.hrms_holiday = {};
				db_hrms_holiday = {};
				select_hrms_holiday_record();
			}
		});
	}

	$scope.insert_hrms_holiday_record = function() {
		$scope.hrms_holiday = {status: 'Active'}
		$scope.hrms_holiday['action'] = 'INSERT_HRMS_HOLIDAY';
		hid = undefined;
		$scope.hrms_holiday_status = '';
	}

	$scope.update_hrms_holiday_record = function(x) {
		$scope.hrms_holiday = x;
		$scope.hrms_holiday['action'] = 'UPDATE_HRMS_HOLIDAY';
		hid = x['sysid'];
		$scope.hrms_holiday_status = '';
	}

})