var app = angular.module('ebs2App');
app.controller('ebs_rulesCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_ebs_rules={};
	$scope.admin_ebs_rulesList=[];
	var db_admin_ebs_rules={};
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_ebs_rulesOps'};

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

	var select_admin_ebs_rules_record = function() {
		if (hid != undefined)
			$scope.admin_ebs_rules['sysid'] = hid;
		$scope.admin_ebs_rules['action'] = 'SELECT_ADMIN_EBS_RULES';
		db_admin_ebs_rules['trans'] = $scope.admin_ebs_rules;
		db_admin_ebs_rules['proc'] = 'admin_ebs_rulesOps';
		$http.post('/db_data',db_admin_ebs_rules).success(function(response){
			if (response.error!='None'){
				$scope.admin_ebs_rules_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_ebs_rulesList = _.where(response.data[0],{rule_type:'EBS'});
				if (hid != undefined){
					$scope.admin_ebs_rules=$scope.admin_ebs_rulesList[0];
					if ($scope.admin_ebs_rules['rule_text']!=undefined)
						$scope.admin_ebs_rules['rule_text']=$scope.admin_ebs_rules['rule_text'].replace(/\\n/g, '\n');
					if ($scope.admin_ebs_rules['request_params']!=undefined)
						$scope.admin_ebs_rules['request_params']=$scope.admin_ebs_rules['request_params'].replace(/\\n/g, '\n');
					if ($scope.admin_ebs_rules['response_params']!=undefined)
						$scope.admin_ebs_rules['response_params']=$scope.admin_ebs_rules['response_params'].replace(/\\n/g, '\n');
					$scope.admin_ebs_rules['action'] = 'UPDATE_ADMIN_EBS_RULES';
				}
				else {
					$scope.admin_ebs_rules['action'] = 'INSERT_ADMIN_EBS_RULES';
				}
			}
		});
	};
	select_admin_ebs_rules_record();

	$scope.save_admin_ebs_rules_record = function() {
		if ($scope.admin_ebs_rules['rule_text']!=undefined)
			$scope.admin_ebs_rules['rule_text']=$scope.admin_ebs_rules['rule_text'].replace(/\n/g, '\n');
		if ($scope.admin_ebs_rules['request_params']!=undefined)
			$scope.admin_ebs_rules['request_params']=$scope.admin_ebs_rules['request_params'].replace(/\n/g, '\n');
		if ($scope.admin_ebs_rules['response_params']!=undefined)
			$scope.admin_ebs_rules['response_params']=$scope.admin_ebs_rules['response_params'].replace(/\n/g, '\n');
		db_admin_ebs_rules['trans'] = $scope.admin_ebs_rules;
		db_admin_ebs_rules['proc'] = 'admin_ebs_rulesOps';
		$http.post('/db_data',db_admin_ebs_rules).success(function(response){
			if (response.error!='None'){
				$scope.admin_ebs_rules_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_ebs_rules_status = response.data[0][0].msg;
				$scope.admin_ebs_rules = {};
				db_admin_ebs_rules = {};
				hid = undefined;
				select_admin_ebs_rules_record();
			}
		});
	}

	$scope.delete_admin_ebs_rules_record = function(sysid) {
		$scope.admin_ebs_rules['sysid'] = sysid;
		$scope.admin_ebs_rules['action'] = 'DELETE_ADMIN_EBS_RULES';
		db_admin_ebs_rules['trans'] = $scope.admin_ebs_rules;
		db_admin_ebs_rules['proc'] = 'admin_ebs_rulesOps';
		$http.post('/db_data',db_admin_ebs_rules).success(function(response){
			if (response.error!='None'){
				$scope.admin_ebs_rules_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_ebs_rules_status = response.data[0][0].msg;
				$scope.admin_ebs_rules = {};
				db_admin_ebs_rules = {};
				select_admin_ebs_rules_record();
			}
		});
	}

	$scope.insert_admin_ebs_rules_record = function() {
		$scope.admin_ebs_rules = {status: 'Active'}
		$scope.admin_ebs_rules['action'] = 'INSERT_ADMIN_EBS_RULES';
		hid = undefined;
		$scope.admin_ebs_rules_status = '';
	}

	$scope.update_admin_ebs_rules_record = function(x) {
		$scope.admin_ebs_rules = x;
		$scope.admin_ebs_rules['action'] = 'UPDATE_ADMIN_EBS_RULES';
		hid = x['sysid'];
		if ($scope.admin_ebs_rules['rule_text']!=undefined)
			$scope.admin_ebs_rules['rule_text']=$scope.admin_ebs_rules['rule_text'].replace(/\\n/g, '\n');
		if ($scope.admin_ebs_rules['request_params']!=undefined)
			$scope.admin_ebs_rules['request_params']=$scope.admin_ebs_rules['request_params'].replace(/\\n/g, '\n');
		if ($scope.admin_ebs_rules['response_params']!=undefined)
			$scope.admin_ebs_rules['response_params']=$scope.admin_ebs_rules['response_params'].replace(/\\n/g, '\n');
		$scope.admin_ebs_rules_status = '';
	}

})