var app = angular.module('ebs2App');
app.controller('cont_reg_listCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.hrms_contractor={};
	$scope.hrms_contractorList=[];
	var db_hrms_contractor={};
	$scope.admin_companyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'hrms_contractorOps'};

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

	var select_hrms_contractor_record = function() {
		if (hid != undefined)
			$scope.hrms_contractor['sysid'] = hid;
		$scope.hrms_contractor['action'] = 'SELECT_HRMS_CONTRACTOR';
		db_hrms_contractor['trans'] = $scope.hrms_contractor;
		db_hrms_contractor['proc'] = 'hrms_contractorOps';
		$http.post('/db_data',db_hrms_contractor).success(function(response){
			if (response.error!='None'){
				$scope.hrms_contractor_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_contractorList = response.data[0];
				if (hid != undefined){
					$scope.hrms_contractor=response.data[0][0];
					$scope.hrms_contractor['action'] = 'UPDATE_HRMS_CONTRACTOR';
				}
				else {
					$scope.hrms_contractor['action'] = 'INSERT_HRMS_CONTRACTOR';
				}
			}
		});
	};
	select_hrms_contractor_record();

	$scope.save_hrms_contractor_record = function() {
		db_hrms_contractor['trans'] = $scope.hrms_contractor;
		db_hrms_contractor['proc'] = 'hrms_contractorOps';
		$http.post('/db_data',db_hrms_contractor).success(function(response){
			if (response.error!='None'){
				$scope.hrms_contractor_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.hrms_contractor_status = response.data[0][0].msg;
				$scope.hrms_contractor = {};
				db_hrms_contractor = {};
				hid = undefined;
				select_hrms_contractor_record();
			}
		});
	}

	$scope.delete_hrms_contractor_record = function(sysid) {
		$scope.hrms_contractor['sysid'] = sysid;
		$scope.hrms_contractor['action'] = 'DELETE_HRMS_CONTRACTOR';
		db_hrms_contractor['trans'] = $scope.hrms_contractor;
		db_hrms_contractor['proc'] = 'hrms_contractorOps';
		$http.post('/db_data',db_hrms_contractor).success(function(response){
			if (response.error!='None'){
				$scope.hrms_contractor_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.hrms_contractor_status = response.data[0][0].msg;
				$scope.hrms_contractor = {};
				db_hrms_contractor = {};
				select_hrms_contractor_record();
			}
		});
	}

	$scope.insert_hrms_contractor_record = function() {
		$scope.hrms_contractor = {status: 'Active'}
		$scope.hrms_contractor['action'] = 'INSERT_HRMS_CONTRACTOR';
		hid = undefined;
		$scope.hrms_contractor_status = '';
	}

	$scope.update_hrms_contractor_record = function(x) {
		$scope.hrms_contractor = x;
		$scope.hrms_contractor['action'] = 'UPDATE_HRMS_CONTRACTOR';
		hid = x['sysid'];
		$scope.hrms_contractor_status = '';
	}

})