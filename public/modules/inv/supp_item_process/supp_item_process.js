var app = angular.module('ebs2App');
app.controller('supp_item_processCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_supp_process={};
	$scope.inv_supp_processList=[];
	var db_inv_supp_process={};
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_supp_processOps'};

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

	var select_inv_supp_process_record = function() {
		if (hid != undefined)
			$scope.inv_supp_process['sysid'] = hid;
		$scope.inv_supp_process['action'] = 'SELECT_INV_SUPP_PROCESS';
		db_inv_supp_process['trans'] = $scope.inv_supp_process;
		db_inv_supp_process['proc'] = 'inv_supp_processOps';
		$http.post('/db_data',db_inv_supp_process).success(function(response){
			if (response.error!='None'){
				$scope.inv_supp_process_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_supp_processList = response.data[0];
				if (hid != undefined){
					$scope.inv_supp_process=response.data[0][0];
					$scope.inv_supp_process['action'] = 'UPDATE_INV_SUPP_PROCESS';
				}
				else {
					$scope.inv_supp_process['action'] = 'INSERT_INV_SUPP_PROCESS';
				}
			}
		});
	};
	select_inv_supp_process_record();

	$scope.save_inv_supp_process_record = function() {
		db_inv_supp_process['trans'] = $scope.inv_supp_process;
		db_inv_supp_process['proc'] = 'inv_supp_processOps';
		$http.post('/db_data',db_inv_supp_process).success(function(response){
			if (response.error!='None'){
				$scope.inv_supp_process_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_supp_process_status = response.data[0][0].msg;
				$scope.inv_supp_process = {};
				db_inv_supp_process = {};
				hid = undefined;
				select_inv_supp_process_record();
			}
		});
	}

	$scope.delete_inv_supp_process_record = function(sysid) {
		$scope.inv_supp_process['sysid'] = sysid;
		$scope.inv_supp_process['action'] = 'DELETE_INV_SUPP_PROCESS';
		db_inv_supp_process['trans'] = $scope.inv_supp_process;
		db_inv_supp_process['proc'] = 'inv_supp_processOps';
		$http.post('/db_data',db_inv_supp_process).success(function(response){
			if (response.error!='None'){
				$scope.inv_supp_process_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_supp_process_status = response.data[0][0].msg;
				$scope.inv_supp_process = {};
				db_inv_supp_process = {};
				select_inv_supp_process_record();
			}
		});
	}

	$scope.insert_inv_supp_process_record = function() {
		$scope.inv_supp_process = {status: 'Active'}
		$scope.inv_supp_process['action'] = 'INSERT_INV_SUPP_PROCESS';
		hid = undefined;
		$scope.inv_supp_process_status = '';
	}

	$scope.update_inv_supp_process_record = function(x) {
		$scope.inv_supp_process = x;
		$scope.inv_supp_process['action'] = 'UPDATE_INV_SUPP_PROCESS';
		hid = x['sysid'];
		$scope.inv_supp_process_status = '';
	}

})