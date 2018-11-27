var app = angular.module('ebs2App');
app.controller('item_processCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.prod_process={};
	$scope.prod_processList=[];
	var db_prod_process={};
	$scope.prod_process_details={};
	$scope.prod_process_detailsList=[];
	var db_prod_process_details={};
	$scope.inv_finished_goodsList=[];
	$scope.inv_machinesList=[];
	$scope.statusList=['Active','Inactive'];
	$scope.taskLocList=['In-house','Vendor'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'prod_processOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_finished_goodsList=response.data[0];
				$scope.inv_machinesList=response.data[1];
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
				$scope.prod_process_detailsList = response.data[1];
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
	if (hid != undefined){
		select_prod_process_record();
	}

	$scope.save_prod_process_record = function() {
		if (hid != undefined){
			$scope.prod_process['action'] = 'UPDATE_PROD_PROCESS';
		}
		else {
			$scope.prod_process['action'] = 'INSERT_PROD_PROCESS';
		}
		db_prod_process['trans'] = $scope.prod_process;
		db_prod_process['proc'] = 'prod_processOps';
		$http.post('/db_data',db_prod_process).success(function(response){
			if (response.error!='None'){
				$scope.prod_process_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_process_status = response.data[0][0].msg;
				$scope.prod_process['sysid']=response.data[1][0].trans_id;
				$scope.trans_id = response.data[1][0].trans_id;
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

	var select_prod_process_details_record = function() {
		$scope.prod_process_details['proc_id'] = $scope.trans_id;
		$scope.prod_process_details['action'] = 'SELECT_PROD_PROCESS_DETAILS';
		db_prod_process_details['trans'] = $scope.prod_process_details;
		db_prod_process_details['proc'] = 'prod_processOps';
		$http.post('/db_data',db_prod_process_details).success(function(response){
			if (response.error!='None'){
				$scope.prod_process_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_process_detailsList = response.data[0];
				if ($scope.prod_process_detailsList.length>0)
					$scope.prod_process_details=response.data[0][0];
			}
		});
	};

	$scope.save_prod_process_details_record = function() {
		if ($scope.trans_id < 1){
			$scope.prod_process_details_status = 'Please create or select master entry..';
			return;
		}
		db_prod_process_details['trans'] = $scope.prod_process_details;
		db_prod_process_details['proc'] = 'prod_processOps';
		$http.post('/db_data',db_prod_process_details).success(function(response){
			if (response.error!='None'){
				$scope.prod_process_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_process_details_status = response.data[0][0].msg;
				$scope.prod_process_details = {};
				db_prod_process_details = {};
				select_prod_process_details_record();
			}
		});
	}

	$scope.delete_prod_process_details_record = function(sysid) {
		$scope.prod_process_details['sysid'] = sysid;
		$scope.prod_process_details['action'] = 'DELETE_PROD_PROCESS_DETAILS';
		db_prod_process_details['trans'] = $scope.prod_process_details;
		db_prod_process_details['proc'] = 'prod_processOps';
		$http.post('/db_data',db_prod_process_details).success(function(response){
			if (response.error!='None'){
				$scope.prod_process_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.prod_process_details_status = response.data[0][0].msg;
				$scope.prod_process_details = {};
				db_prod_process_details = {};
				select_prod_process_details_record();
			}
		});
	}

	$scope.insert_prod_process_details_record = function() {
		if ($scope.trans_id < 1){
			$scope.prod_process_details_status = 'Please create or select master entry..';
			return;
		}
		$scope.prod_process_details = {proc_id: $scope.prod_process['sysid'], status: 'Active'}
		$scope.prod_process_details['action'] = 'INSERT_PROD_PROCESS_DETAILS';
		hid = undefined;
		$scope.prod_process_details_status = '';
	}

	$scope.update_prod_process_details_record = function(x) {
		$scope.prod_process_details = x;
		$scope.prod_process_details['action'] = 'UPDATE_PROD_PROCESS_DETAILS';
		hid = x['sysid'];
		$scope.prod_process_details_status = '';
	}

})