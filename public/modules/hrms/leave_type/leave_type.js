var app = angular.module('ebs2App');
app.controller('leave_typeCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_leave_type={};
	$scope.hrms_leave_typeList=[];
	var db_hrms_leave_type={};
	$scope.admin_companyList=[];
	$scope.carryFwdList=['Yes','No'];
	$scope.encashList=['Yes','No'];
	$scope.encashrateList=['Basic','Gross','Fixed'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_leave_typeOps'};

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

	var select_hrms_leave_type_record = function() {
		if (hid != undefined)
			$scope.hrms_leave_type['sysid'] = hid;
		$scope.hrms_leave_type['action'] = 'SELECT_HRMS_LEAVE_TYPE';
		db_hrms_leave_type['trans'] = $scope.hrms_leave_type;
		db_hrms_leave_type['proc'] = 'hrms_leave_typeOps';
		$http.post('/db_data',db_hrms_leave_type).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_type_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_typeList = response.data[0];
				if (hid != undefined){
					$scope.hrms_leave_type=response.data[0][0];
					$scope.hrms_leave_type['action'] = 'UPDATE_HRMS_LEAVE_TYPE';
				}
				else {
					$scope.hrms_leave_type['action'] = 'INSERT_HRMS_LEAVE_TYPE';
				}
			}
		});
	};
	select_hrms_leave_type_record();

	$scope.save_hrms_leave_type_record = function() {
		db_hrms_leave_type['trans'] = $scope.hrms_leave_type;
		db_hrms_leave_type['proc'] = 'hrms_leave_typeOps';
		$http.post('/db_data',db_hrms_leave_type).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_type_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_type_status = response.data[0][0].msg;
				$scope.hrms_leave_type = {};
				db_hrms_leave_type = {};
				hid = undefined;
				select_hrms_leave_type_record();
			}
		});
	}

	$scope.delete_hrms_leave_type_record = function(sysid) {
		$scope.hrms_leave_type['sysid'] = sysid;
		$scope.hrms_leave_type['action'] = 'DELETE_HRMS_LEAVE_TYPE';
		db_hrms_leave_type['trans'] = $scope.hrms_leave_type;
		db_hrms_leave_type['proc'] = 'hrms_leave_typeOps';
		$http.post('/db_data',db_hrms_leave_type).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_type_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_leave_type_status = response.data[0][0].msg;
				$scope.hrms_leave_type = {};
				db_hrms_leave_type = {};
				select_hrms_leave_type_record();
			}
		});
	}

	$scope.insert_hrms_leave_type_record = function() {
		$scope.hrms_leave_type = {status: 'Active'}
		$scope.hrms_leave_type['action'] = 'INSERT_HRMS_LEAVE_TYPE';
		hid = undefined;
		$scope.hrms_leave_type_status = '';
	}

	$scope.update_hrms_leave_type_record = function(x) {
		$scope.hrms_leave_type = x;
		$scope.hrms_leave_type['action'] = 'UPDATE_HRMS_LEAVE_TYPE';
		hid = x['sysid'];
		$scope.hrms_leave_type_status = '';
	}

})