var app = angular.module('ebs2App');
app.controller('machines_springsCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_machines_springs={};
	$scope.inv_machines_springsList=[];
	var db_inv_machines_springs={};
	$scope.admin_deptList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_machines_springsOps'};

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

	var select_inv_machines_springs_record = function() {
		if (hid != undefined)
			$scope.inv_machines_springs['sysid'] = hid;
		$scope.inv_machines_springs['action'] = 'SELECT_INV_MACHINES_SPRINGS';
		db_inv_machines_springs['trans'] = $scope.inv_machines_springs;
		db_inv_machines_springs['proc'] = 'inv_machines_springsOps';
		$http.post('/db_data',db_inv_machines_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_machines_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_machines_springsList = response.data[0];
				if (hid != undefined){
					$scope.inv_machines_springs=response.data[0][0];
					$scope.inv_machines_springs['action'] = 'UPDATE_INV_MACHINES_SPRINGS';
				}
				else {
					$scope.inv_machines_springs['action'] = 'INSERT_INV_MACHINES_SPRINGS';
				}
			}
		});
	};
	select_inv_machines_springs_record();

	$scope.save_inv_machines_springs_record = function() {
		db_inv_machines_springs['trans'] = $scope.inv_machines_springs;
		db_inv_machines_springs['proc'] = 'inv_machines_springsOps';
		$http.post('/db_data',db_inv_machines_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_machines_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_machines_springs_status = response.data[0][0].msg;
				$scope.inv_machines_springs = {};
				db_inv_machines_springs = {};
				hid = undefined;
				select_inv_machines_springs_record();
			}
		});
	}

	$scope.delete_inv_machines_springs_record = function(sysid) {
		$scope.inv_machines_springs['sysid'] = sysid;
		$scope.inv_machines_springs['action'] = 'DELETE_INV_MACHINES_SPRINGS';
		db_inv_machines_springs['trans'] = $scope.inv_machines_springs;
		db_inv_machines_springs['proc'] = 'inv_machines_springsOps';
		$http.post('/db_data',db_inv_machines_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_machines_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_machines_springs_status = response.data[0][0].msg;
				$scope.inv_machines_springs = {};
				db_inv_machines_springs = {};
				select_inv_machines_springs_record();
			}
		});
	}

	$scope.insert_inv_machines_springs_record = function() {
		$scope.inv_machines_springs = {status: 'Active'}
		$scope.inv_machines_springs['action'] = 'INSERT_INV_MACHINES_SPRINGS';
		hid = undefined;
		$scope.inv_machines_springs_status = '';
	}

	$scope.update_inv_machines_springs_record = function(x) {
		$scope.inv_machines_springs = x;
		$scope.inv_machines_springs['action'] = 'UPDATE_INV_MACHINES_SPRINGS';
		hid = x['sysid'];
		$scope.inv_machines_springs_status = '';
	}

})