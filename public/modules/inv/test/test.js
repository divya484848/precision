var app = angular.module('ebs2App');
app.controller('testCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_item_attribs_springs_master={};
	$scope.inv_item_attribs_springs_masterList=[];
	var db_inv_item_attribs_springs_master={};
	$scope.inv_item_master_springsList=[];
	$scope.inv_attribs_springs_masterList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_item_attribs_springs_masterOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_item_master_springsList=response.data[0];
				$scope.inv_attribs_springs_masterList=response.data[1];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_item_attribs_springs_master_record = function() {
		if (hid != undefined)
			$scope.inv_item_attribs_springs_master['sysid'] = hid;
		$scope.inv_item_attribs_springs_master['action'] = 'SELECT_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
		db_inv_item_attribs_springs_master['trans'] = $scope.inv_item_attribs_springs_master;
		db_inv_item_attribs_springs_master['proc'] = 'inv_item_attribs_springs_masterOps';
		$http.post('/db_data',db_inv_item_attribs_springs_master).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_attribs_springs_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_attribs_springs_masterList = response.data[0];
				if (hid != undefined){
					$scope.inv_item_attribs_springs_master=response.data[0][0];
					$scope.inv_item_attribs_springs_master['action'] = 'UPDATE_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
				}
				else {
					$scope.inv_item_attribs_springs_master['action'] = 'INSERT_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
				}
			}
		});
	};
	select_inv_item_attribs_springs_master_record();

	$scope.save_inv_item_attribs_springs_master_record = function() {
		db_inv_item_attribs_springs_master['trans'] = $scope.inv_item_attribs_springs_master;
		db_inv_item_attribs_springs_master['proc'] = 'inv_item_attribs_springs_masterOps';
		$http.post('/db_data',db_inv_item_attribs_springs_master).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_attribs_springs_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_attribs_springs_master_status = response.data[0][0].msg;
				$scope.inv_item_attribs_springs_master = {};
				db_inv_item_attribs_springs_master = {};
				hid = undefined;
				select_inv_item_attribs_springs_master_record();
			}
		});
	}

	$scope.delete_inv_item_attribs_springs_master_record = function(sysid) {
		$scope.inv_item_attribs_springs_master['sysid'] = sysid;
		$scope.inv_item_attribs_springs_master['action'] = 'DELETE_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
		db_inv_item_attribs_springs_master['trans'] = $scope.inv_item_attribs_springs_master;
		db_inv_item_attribs_springs_master['proc'] = 'inv_item_attribs_springs_masterOps';
		$http.post('/db_data',db_inv_item_attribs_springs_master).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_attribs_springs_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_attribs_springs_master_status = response.data[0][0].msg;
				$scope.inv_item_attribs_springs_master = {};
				db_inv_item_attribs_springs_master = {};
				select_inv_item_attribs_springs_master_record();
			}
		});
	}

	$scope.insert_inv_item_attribs_springs_master_record = function() {
		$scope.inv_item_attribs_springs_master = {status: 'Active'}
		$scope.inv_item_attribs_springs_master['action'] = 'INSERT_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
		hid = undefined;
		$scope.inv_item_attribs_springs_master_status = '';
	}

	$scope.update_inv_item_attribs_springs_master_record = function(x) {
		$scope.inv_item_attribs_springs_master = x;
		$scope.inv_item_attribs_springs_master['action'] = 'UPDATE_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
		hid = x['sysid'];
		$scope.inv_item_attribs_springs_master_status = '';
	}

})