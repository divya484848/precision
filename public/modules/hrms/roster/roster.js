var app = angular.module('ebs2App');
app.controller('rosterCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_shift_roster={};
	$scope.hrms_shift_rosterList=[];
	var db_hrms_shift_roster={};
	$scope.hrms_employeesList=[];
	$scope.hrms_shift_masterList=[];
	$scope.admin_companyList=[];
	$scope.otList=['Yes','No'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_shift_rosterOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_employeesList=response.data[0];
				$scope.hrms_shift_masterList=response.data[1];
				$scope.admin_companyList=response.data[2];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_shift_roster_record = function() {
		if (hid != undefined)
			$scope.hrms_shift_roster['sysid'] = hid;
		$scope.hrms_shift_roster['action'] = 'SELECT_HRMS_SHIFT_ROSTER';
		db_hrms_shift_roster['trans'] = $scope.hrms_shift_roster;
		db_hrms_shift_roster['proc'] = 'hrms_shift_rosterOps';
		$http.post('/db_data',db_hrms_shift_roster).success(function(response){
			if (response.error!='None'){
				$scope.hrms_shift_roster_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_shift_rosterList = response.data[0];
				if (hid != undefined){
					$scope.hrms_shift_roster=response.data[0][0];
					$scope.hrms_shift_roster['action'] = 'UPDATE_HRMS_SHIFT_ROSTER';
				}
				else {
					$scope.hrms_shift_roster['action'] = 'INSERT_HRMS_SHIFT_ROSTER';
				}
			}
		});
	};
	select_hrms_shift_roster_record();

	$scope.save_hrms_shift_roster_record = function() {
		db_hrms_shift_roster['trans'] = $scope.hrms_shift_roster;
		db_hrms_shift_roster['proc'] = 'hrms_shift_rosterOps';
		$http.post('/db_data',db_hrms_shift_roster).success(function(response){
			if (response.error!='None'){
				$scope.hrms_shift_roster_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_shift_roster_status = response.data[0][0].msg;
				$scope.hrms_shift_roster = {};
				db_hrms_shift_roster = {};
				hid = undefined;
				select_hrms_shift_roster_record();
			}
		});
	}

	$scope.delete_hrms_shift_roster_record = function(sysid) {
		$scope.hrms_shift_roster['sysid'] = sysid;
		$scope.hrms_shift_roster['action'] = 'DELETE_HRMS_SHIFT_ROSTER';
		db_hrms_shift_roster['trans'] = $scope.hrms_shift_roster;
		db_hrms_shift_roster['proc'] = 'hrms_shift_rosterOps';
		$http.post('/db_data',db_hrms_shift_roster).success(function(response){
			if (response.error!='None'){
				$scope.hrms_shift_roster_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_shift_roster_status = response.data[0][0].msg;
				$scope.hrms_shift_roster = {};
				db_hrms_shift_roster = {};
				select_hrms_shift_roster_record();
			}
		});
	}

	$scope.insert_hrms_shift_roster_record = function() {
		$scope.hrms_shift_roster = {status: 'Active'}
		$scope.hrms_shift_roster['action'] = 'INSERT_HRMS_SHIFT_ROSTER';
		hid = undefined;
		$scope.hrms_shift_roster_status = '';
	}

	$scope.update_hrms_shift_roster_record = function(x) {
		$scope.hrms_shift_roster = x;
		$scope.hrms_shift_roster['action'] = 'UPDATE_HRMS_SHIFT_ROSTER';
		hid = x['sysid'];
		$scope.hrms_shift_roster_status = '';
	}

})