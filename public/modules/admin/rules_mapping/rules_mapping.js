var app = angular.module('ebs2App');
app.controller('rules_mappingCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_rules_mapping={};
	$scope.admin_rules_mappingList=[];
	var db_admin_rules_mapping={};
	$scope.admin_rules_mapping_details={};
	$scope.admin_rules_mapping_detailsList=[];
	var db_admin_rules_mapping_details={};
	$scope.admin_rules_mappingList=[];
	$scope.admin_ebs_rulesList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_rules_mappingOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_rules_mappingList=response.data[0];
				$scope.admin_ebs_rulesList=response.data[1];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_admin_rules_mapping_record = function() {
		if (hid != undefined)
			$scope.admin_rules_mapping['sysid'] = hid;
		$scope.admin_rules_mapping['action'] = 'SELECT_ADMIN_RULES_MAPPING';
		db_admin_rules_mapping['trans'] = $scope.admin_rules_mapping;
		db_admin_rules_mapping['proc'] = 'admin_rules_mappingOps';
		$http.post('/db_data',db_admin_rules_mapping).success(function(response){
			if (response.error!='None'){
				$scope.admin_rules_mapping_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_rules_mappingList = response.data[0];
				$scope.admin_rules_mapping_detailsList = response.data[1];
				if (hid != undefined){
					$scope.admin_rules_mapping=response.data[0][0];
					$scope.admin_rules_mapping['action'] = 'UPDATE_ADMIN_RULES_MAPPING';
				}
				else {
					$scope.admin_rules_mapping['action'] = 'INSERT_ADMIN_RULES_MAPPING';
				}
			}
		});
	};
	select_admin_rules_mapping_record();

	$scope.save_admin_rules_mapping_record = function() {
		db_admin_rules_mapping['trans'] = $scope.admin_rules_mapping;
		db_admin_rules_mapping['proc'] = 'admin_rules_mappingOps';
		$http.post('/db_data',db_admin_rules_mapping).success(function(response){
			if (response.error!='None'){
				$scope.admin_rules_mapping_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_rules_mapping_status = response.data[0][0].msg;
				$scope.admin_rules_mapping = {};
				db_admin_rules_mapping = {};
				hid = undefined;
				select_admin_rules_mapping_record();
			}
		});
	}

	$scope.delete_admin_rules_mapping_record = function(sysid) {
		$scope.admin_rules_mapping['sysid'] = sysid;
		$scope.admin_rules_mapping['action'] = 'DELETE_ADMIN_RULES_MAPPING';
		db_admin_rules_mapping['trans'] = $scope.admin_rules_mapping;
		db_admin_rules_mapping['proc'] = 'admin_rules_mappingOps';
		$http.post('/db_data',db_admin_rules_mapping).success(function(response){
			if (response.error!='None'){
				$scope.admin_rules_mapping_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_rules_mapping_status = response.data[0][0].msg;
				$scope.admin_rules_mapping = {};
				db_admin_rules_mapping = {};
				select_admin_rules_mapping_record();
			}
		});
	}

	$scope.insert_admin_rules_mapping_record = function() {
		$scope.admin_rules_mapping = {status: 'Active'}
		$scope.admin_rules_mapping['action'] = 'INSERT_ADMIN_RULES_MAPPING';
		hid = undefined;
		$scope.admin_rules_mapping_status = '';
	}

	$scope.update_admin_rules_mapping_record = function(x) {
		$scope.admin_rules_mapping = x;
		$scope.admin_rules_mapping['action'] = 'UPDATE_ADMIN_RULES_MAPPING';
		hid = x['sysid'];
		$scope.admin_rules_mapping_status = '';
	}

	var select_admin_rules_mapping_details_record = function() {
		$scope.admin_rules_mapping_details['profile_id'] = $scope.trans_id;
		$scope.admin_rules_mapping_details['action'] = 'SELECT_ADMIN_RULES_MAPPING_DETAILS';
		db_admin_rules_mapping_details['trans'] = $scope.admin_rules_mapping_details;
		db_admin_rules_mapping_details['proc'] = 'admin_rules_mapping_detailsOps';
		$http.post('/db_data',db_admin_rules_mapping_details).success(function(response){
			if (response.error!='None'){
				$scope.admin_rules_mapping_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_rules_mapping_detailsList = response.data[0];
				if ($scope.admin_rules_mapping_detailsList.length>0)
					$scope.admin_rules_mapping_details=response.data[0][0];
			}
		});
	};

	$scope.save_admin_rules_mapping_details_record = function() {
		if ($scope.trans_id < 1){
			$scope.admin_rules_mapping_details_status = 'Please create or select master entry..';
			return;
		}
		db_admin_rules_mapping_details['trans'] = $scope.admin_rules_mapping_details;
		db_admin_rules_mapping_details['proc'] = 'admin_rules_mapping_detailsOps';
		$http.post('/db_data',db_admin_rules_mapping_details).success(function(response){
			if (response.error!='None'){
				$scope.admin_rules_mapping_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_rules_mapping_details_status = response.data[0][0].msg;
				$scope.admin_rules_mapping_details = {};
				db_admin_rules_mapping_details = {};
				select_admin_rules_mapping_details_record();
			}
		});
	}

	$scope.delete_admin_rules_mapping_details_record = function(sysid) {
		$scope.admin_rules_mapping_details['sysid'] = sysid;
		$scope.admin_rules_mapping_details['action'] = 'DELETE_ADMIN_RULES_MAPPING_DETAILS';
		db_admin_rules_mapping_details['trans'] = $scope.admin_rules_mapping_details;
		db_admin_rules_mapping_details['proc'] = 'admin_rules_mapping_detailsOps';
		$http.post('/db_data',db_admin_rules_mapping_details).success(function(response){
			if (response.error!='None'){
				$scope.admin_rules_mapping_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_rules_mapping_details_status = response.data[0][0].msg;
				$scope.admin_rules_mapping_details = {};
				db_admin_rules_mapping_details = {};
				select_admin_rules_mapping_details_record();
			}
		});
	}

	$scope.insert_admin_rules_mapping_details_record = function() {
		$scope.admin_rules_mapping_details = {status: 'Active'}
		$scope.admin_rules_mapping_details['action'] = 'INSERT_ADMIN_RULES_MAPPING_DETAILS';
		hid = undefined;
		$scope.admin_rules_mapping_details_status = '';
	}

	$scope.update_admin_rules_mapping_details_record = function(x) {
		$scope.admin_rules_mapping_details = x;
		$scope.admin_rules_mapping_details['action'] = 'UPDATE_ADMIN_RULES_MAPPING_DETAILS';
		hid = x['sysid'];
		$scope.admin_rules_mapping_details_status = '';
	}

})