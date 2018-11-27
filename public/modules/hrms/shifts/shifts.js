var app = angular.module('ebs2App');
app.controller('shiftsCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_shift_master={};
	$scope.hrms_shift_masterList=[];
	var db_hrms_shift_master={};
	$scope.admin_companyList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_shift_masterOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_companyList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_shift_master_record = function() {
		if (hid != undefined)
			$scope.hrms_shift_master['sysid'] = hid;
		$scope.hrms_shift_master['action'] = 'SELECT_HRMS_SHIFT_MASTER';
		db_hrms_shift_master['trans'] = $scope.hrms_shift_master;
		db_hrms_shift_master['proc'] = 'hrms_shift_masterOps';
		$http.post('/db_data',db_hrms_shift_master).success(function(response){
			if (response.error!='None'){
				$scope.hrms_shift_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_shift_masterList = response.data[0];
				if (hid != undefined){
					$scope.hrms_shift_master=response.data[0][0];
					$scope.hrms_shift_master['action'] = 'UPDATE_HRMS_SHIFT_MASTER';
				}
				else {
					$scope.hrms_shift_master['action'] = 'INSERT_HRMS_SHIFT_MASTER';
				}
			}
		});
	};
	select_hrms_shift_master_record();

	$scope.save_hrms_shift_master_record = function() {
		db_hrms_shift_master['trans'] = $scope.hrms_shift_master;
		db_hrms_shift_master['proc'] = 'hrms_shift_masterOps';
		$http.post('/db_data',db_hrms_shift_master).success(function(response){
			if (response.error!='None'){
				$scope.hrms_shift_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_shift_master_status = response.data[0][0].msg;
				$scope.hrms_shift_master = {};
				db_hrms_shift_master = {};
				hid = undefined;
				select_hrms_shift_master_record();
			}
		});
	}

	$scope.delete_hrms_shift_master_record = function(sysid) {
		$scope.hrms_shift_master['sysid'] = sysid;
		$scope.hrms_shift_master['action'] = 'DELETE_HRMS_SHIFT_MASTER';
		db_hrms_shift_master['trans'] = $scope.hrms_shift_master;
		db_hrms_shift_master['proc'] = 'hrms_shift_masterOps';
		$http.post('/db_data',db_hrms_shift_master).success(function(response){
			if (response.error!='None'){
				$scope.hrms_shift_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_shift_master_status = response.data[0][0].msg;
				$scope.hrms_shift_master = {};
				db_hrms_shift_master = {};
				select_hrms_shift_master_record();
			}
		});
	}

	$scope.insert_hrms_shift_master_record = function() {
		$scope.hrms_shift_master = {status: 'Active'}
		$scope.hrms_shift_master['action'] = 'INSERT_HRMS_SHIFT_MASTER';
		hid = undefined;
		$scope.hrms_shift_master_status = '';
	}

	$scope.update_hrms_shift_master_record = function(x) {
		$scope.hrms_shift_master = x;
		$scope.hrms_shift_master['action'] = 'UPDATE_HRMS_SHIFT_MASTER';
		hid = x['sysid'];
		$scope.hrms_shift_master_status = '';
	}

})