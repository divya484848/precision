var app = angular.module('ebs2App');
app.controller('leave_assignCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_leave_balance={};
	$scope.hrms_leave_balanceList=[];
	var db_hrms_leave_balance={};
	$scope.hrms_leave_typeList=[];
	$scope.statuslist=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_leave_balanceOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.hrms_leave_typeList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_hrms_leave_balance_record = function() {
		if (hid != undefined)
			$scope.hrms_leave_balance['sysid'] = hid;
		$scope.hrms_leave_balance['action'] = 'SELECT_HRMS_LEAVE_BALANCE';
		db_hrms_leave_balance['trans'] = $scope.hrms_leave_balance;
		db_hrms_leave_balance['proc'] = 'hrms_leave_balanceOps';
		$http.post('/db_data',db_hrms_leave_balance).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_balance_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_balanceList = response.data[0];
				if (hid != undefined){
					$scope.hrms_leave_balance=response.data[0][0];
					$scope.hrms_leave_balance['action'] = 'UPDATE_HRMS_LEAVE_BALANCE';
				}
				else {
					$scope.hrms_leave_balance['action'] = 'INSERT_HRMS_LEAVE_BALANCE';
				}
			}
		});
	};
	select_hrms_leave_balance_record();

	$scope.save_hrms_leave_balance_record = function() {
		db_hrms_leave_balance['trans'] = $scope.hrms_leave_balance;
		db_hrms_leave_balance['proc'] = 'hrms_leave_balanceOps';
		$http.post('/db_data',db_hrms_leave_balance).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_balance_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_leave_balance_status = response.data[0][0].msg;
				$scope.hrms_leave_balance = {};
				db_hrms_leave_balance = {};
				hid = undefined;
				select_hrms_leave_balance_record();
			}
		});
	}

	$scope.delete_hrms_leave_balance_record = function(sysid) {
		$scope.hrms_leave_balance['sysid'] = sysid;
		$scope.hrms_leave_balance['action'] = 'DELETE_HRMS_LEAVE_BALANCE';
		db_hrms_leave_balance['trans'] = $scope.hrms_leave_balance;
		db_hrms_leave_balance['proc'] = 'hrms_leave_balanceOps';
		$http.post('/db_data',db_hrms_leave_balance).success(function(response){
			if (response.error!='None'){
				$scope.hrms_leave_balance_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_leave_balance_status = response.data[0][0].msg;
				$scope.hrms_leave_balance = {};
				db_hrms_leave_balance = {};
				select_hrms_leave_balance_record();
			}
		});
	}

	$scope.insert_hrms_leave_balance_record = function() {
		$scope.hrms_leave_balance = {status: 'Active'}
		$scope.hrms_leave_balance['action'] = 'INSERT_HRMS_LEAVE_BALANCE';
		hid = undefined;
		$scope.hrms_leave_balance_status = '';
	}

	$scope.update_hrms_leave_balance_record = function(x) {
		$scope.hrms_leave_balance = x;
		$scope.hrms_leave_balance['action'] = 'UPDATE_HRMS_LEAVE_BALANCE';
		hid = x['sysid'];
		$scope.hrms_leave_balance_status = '';
	}

})