var app = angular.module('ebs2App');
app.controller('item_process_listCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.prod_process={};
	$scope.prod_processList=[];
	var db_prod_process={};
	$scope.inv_finished_goodsList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'prod_processOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_finished_goodsList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_prod_process_record = function() {
		if (hid != undefined)
			$scope.prod_process['sysid'] = hid;
		$scope.prod_process['action'] = 'SELECT_PROD_PROCESS';
		db_prod_process['trans'] = $scope.prod_process;
		db_prod_process['proc'] = 'prod_processOps';
		$http.post('/db_data',db_prod_process).success(function(response){
			if (response.error!='None'){
				$scope.prod_process_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_processList = response.data[0];
				if (hid != undefined){
					$scope.prod_process=response.data[0][0];
					$scope.prod_process['action'] = 'UPDATE_PROD_PROCESS';
				}
				else {
					$scope.prod_process['action'] = 'INSERT_PROD_PROCESS';
				}
			}
		});
	};
	select_prod_process_record();

	$scope.save_prod_process_record = function() {
		db_prod_process['trans'] = $scope.prod_process;
		db_prod_process['proc'] = 'prod_processOps';
		$http.post('/db_data',db_prod_process).success(function(response){
			if (response.error!='None'){
				$scope.prod_process_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_process_status = response.data[0][0].msg;
				$scope.prod_process = {};
				db_prod_process = {};
				hid = undefined;
				select_prod_process_record();
			}
		});
	}

	$scope.delete_prod_process_record = function(sysid) {
		$scope.prod_process['sysid'] = sysid;
		$scope.prod_process['action'] = 'DELETE_PROD_PROCESS';
		db_prod_process['trans'] = $scope.prod_process;
		db_prod_process['proc'] = 'prod_processOps';
		$http.post('/db_data',db_prod_process).success(function(response){
			if (response.error!='None'){
				$scope.prod_process_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.prod_process_status = response.data[0][0].msg;
				$scope.prod_process = {};
				db_prod_process = {};
				select_prod_process_record();
			}
		});
	}

	$scope.insert_prod_process_record = function() {
		$scope.prod_process = {status: 'Active'}
		$scope.prod_process['action'] = 'INSERT_PROD_PROCESS';
		hid = undefined;
		$scope.prod_process_status = '';
	}

	$scope.update_prod_process_record = function(x) {
		$scope.prod_process = x;
		$scope.prod_process['action'] = 'UPDATE_PROD_PROCESS';
		hid = x['sysid'];
		$scope.prod_process_status = '';
	}

})