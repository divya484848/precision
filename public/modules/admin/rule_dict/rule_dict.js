var app = angular.module('ebs2App');
app.controller('rule_dictCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_rule_dict={};
	$scope.admin_rule_dictList=[];
	var db_admin_rule_dict={};
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_rule_dictOps'};

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

	var select_admin_rule_dict_record = function() {
		if (hid != undefined)
			$scope.admin_rule_dict['sysid'] = hid;
		$scope.admin_rule_dict['action'] = 'SELECT_ADMIN_RULE_DICT';
		db_admin_rule_dict['trans'] = $scope.admin_rule_dict;
		db_admin_rule_dict['proc'] = 'admin_rule_dictOps';
		$http.post('/db_data',db_admin_rule_dict).success(function(response){
			if (response.error!='None'){
				$scope.admin_rule_dict_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_rule_dictList = response.data[0];
				if (hid != undefined){
					$scope.admin_rule_dict=response.data[0][0];
					$scope.admin_rule_dict['action'] = 'UPDATE_ADMIN_RULE_DICT';
				}
				else {
					$scope.admin_rule_dict['action'] = 'INSERT_ADMIN_RULE_DICT';
				}
			}
		});
	};
	select_admin_rule_dict_record();

	$scope.save_admin_rule_dict_record = function() {
		db_admin_rule_dict['trans'] = $scope.admin_rule_dict;
		db_admin_rule_dict['proc'] = 'admin_rule_dictOps';
		$http.post('/db_data',db_admin_rule_dict).success(function(response){
			if (response.error!='None'){
				$scope.admin_rule_dict_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_rule_dict_status = response.data[0][0].msg;
				$scope.admin_rule_dict = {};
				db_admin_rule_dict = {};
				hid = undefined;
				select_admin_rule_dict_record();
			}
		});
	}

	$scope.delete_admin_rule_dict_record = function(sysid) {
		$scope.admin_rule_dict['sysid'] = sysid;
		$scope.admin_rule_dict['action'] = 'DELETE_ADMIN_RULE_DICT';
		db_admin_rule_dict['trans'] = $scope.admin_rule_dict;
		db_admin_rule_dict['proc'] = 'admin_rule_dictOps';
		$http.post('/db_data',db_admin_rule_dict).success(function(response){
			if (response.error!='None'){
				$scope.admin_rule_dict_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_rule_dict_status = response.data[0][0].msg;
				$scope.admin_rule_dict = {};
				db_admin_rule_dict = {};
				select_admin_rule_dict_record();
			}
		});
	}

	$scope.insert_admin_rule_dict_record = function() {
		$scope.admin_rule_dict = {status: 'Active'}
		$scope.admin_rule_dict['action'] = 'INSERT_ADMIN_RULE_DICT';
		hid = undefined;
		$scope.admin_rule_dict_status = '';
	}

	$scope.update_admin_rule_dict_record = function(x) {
		$scope.admin_rule_dict = x;
		$scope.admin_rule_dict['action'] = 'UPDATE_ADMIN_RULE_DICT';
		hid = x['sysid'];
		$scope.admin_rule_dict_status = '';
	}

})