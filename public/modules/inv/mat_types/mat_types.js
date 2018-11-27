var app = angular.module('ebs2App');
app.controller('mat_typesCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_mat_types={};
	$scope.inv_mat_typesList=[];
	var db_inv_mat_types={};
	$scope.matCatList=['Raw','Finished'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_mat_typesOps'};

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

	var select_inv_mat_types_record = function() {
		if (hid != undefined)
			$scope.inv_mat_types['sysid'] = hid;
		$scope.inv_mat_types['action'] = 'SELECT_INV_MAT_TYPES';
		db_inv_mat_types['trans'] = $scope.inv_mat_types;
		db_inv_mat_types['proc'] = 'inv_mat_typesOps';
		$http.post('/db_data',db_inv_mat_types).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_types_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_typesList = response.data[0];
				if (hid != undefined){
					$scope.inv_mat_types=response.data[0][0];
					$scope.inv_mat_types['action'] = 'UPDATE_INV_MAT_TYPES';
				}
				else {
					$scope.inv_mat_types['action'] = 'INSERT_INV_MAT_TYPES';
				}
			}
		});
	};
	select_inv_mat_types_record();

	$scope.save_inv_mat_types_record = function() {
		db_inv_mat_types['trans'] = $scope.inv_mat_types;
		db_inv_mat_types['proc'] = 'inv_mat_typesOps';
		$http.post('/db_data',db_inv_mat_types).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_types_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_types_status = response.data[0][0].msg;
				$scope.inv_mat_types = {};
				db_inv_mat_types = {};
				hid = undefined;
				select_inv_mat_types_record();
			}
		});
	}

	$scope.delete_inv_mat_types_record = function(sysid) {
		$scope.inv_mat_types['sysid'] = sysid;
		$scope.inv_mat_types['action'] = 'DELETE_INV_MAT_TYPES';
		db_inv_mat_types['trans'] = $scope.inv_mat_types;
		db_inv_mat_types['proc'] = 'inv_mat_typesOps';
		$http.post('/db_data',db_inv_mat_types).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_types_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_mat_types_status = response.data[0][0].msg;
				$scope.inv_mat_types = {};
				db_inv_mat_types = {};
				select_inv_mat_types_record();
			}
		});
	}

	$scope.insert_inv_mat_types_record = function() {
		$scope.inv_mat_types = {status: 'Active'}
		$scope.inv_mat_types['action'] = 'INSERT_INV_MAT_TYPES';
		hid = undefined;
		$scope.inv_mat_types_status = '';
	}

	$scope.update_inv_mat_types_record = function(x) {
		$scope.inv_mat_types = x;
		$scope.inv_mat_types['action'] = 'UPDATE_INV_MAT_TYPES';
		hid = x['sysid'];
		$scope.inv_mat_types_status = '';
	}

})