var app = angular.module('ebs2App');
app.controller('machinesCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_machines={};
	$scope.inv_machinesList=[];
	var db_inv_machines={};
	$scope.admin_deptList=[];
	$scope.macTypeList=[''];
	$scope.matCatList=[''];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_machinesOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_deptList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_machines_record = function() {
		if (hid != undefined)
			$scope.inv_machines['sysid'] = hid;
		$scope.inv_machines['action'] = 'SELECT_INV_MACHINES';
		db_inv_machines['trans'] = $scope.inv_machines;
		db_inv_machines['proc'] = 'inv_machinesOps';
		$http.post('/db_data',db_inv_machines).success(function(response){
			if (response.error!='None'){
				$scope.inv_machines_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_machinesList = response.data[0];
				if (hid != undefined){
					$scope.inv_machines=response.data[0][0];
					$scope.inv_machines['action'] = 'UPDATE_INV_MACHINES';
				}
				else {
					$scope.inv_machines['action'] = 'INSERT_INV_MACHINES';
				}
			}
		});
	};
	select_inv_machines_record();

	$scope.save_inv_machines_record = function() {
		db_inv_machines['trans'] = $scope.inv_machines;
		db_inv_machines['proc'] = 'inv_machinesOps';
		$http.post('/db_data',db_inv_machines).success(function(response){
			if (response.error!='None'){
				$scope.inv_machines_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_machines_status = response.data[0][0].msg;
				$scope.inv_machines = {};
				db_inv_machines = {};
				hid = undefined;
				select_inv_machines_record();
			}
		});
	}

	$scope.delete_inv_machines_record = function(sysid) {
		$scope.inv_machines['sysid'] = sysid;
		$scope.inv_machines['action'] = 'DELETE_INV_MACHINES';
		db_inv_machines['trans'] = $scope.inv_machines;
		db_inv_machines['proc'] = 'inv_machinesOps';
		$http.post('/db_data',db_inv_machines).success(function(response){
			if (response.error!='None'){
				$scope.inv_machines_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_machines_status = response.data[0][0].msg;
				$scope.inv_machines = {};
				db_inv_machines = {};
				select_inv_machines_record();
			}
		});
	}

	$scope.insert_inv_machines_record = function() {
		$scope.inv_machines = {status: 'Active'}
		$scope.inv_machines['action'] = 'INSERT_INV_MACHINES';
		hid = undefined;
		$scope.inv_machines_status = '';
	}

	$scope.update_inv_machines_record = function(x) {
		$scope.inv_machines = x;
		$scope.inv_machines['action'] = 'UPDATE_INV_MACHINES';
		hid = x['sysid'];
		$scope.inv_machines_status = '';
	}

})