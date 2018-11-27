var app = angular.module('ebs2App');
app.controller('item_master_springslistCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_item_master_springs={};
	$scope.inv_item_master_springsList=[];
	var db_inv_item_master_springs={};
	$scope.admin_lovList=[];
	$scope.admin_lovList=[];
	$scope.admin_lovList=[];
	$scope.admin_lovList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_item_master_springsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_lovList=response.data[0];
				$scope.admin_lovList=response.data[1];
				$scope.admin_lovList=response.data[2];
				$scope.admin_lovList=response.data[3];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_item_master_springs_record = function() {
		if (hid != undefined)
			$scope.inv_item_master_springs['sysid'] = hid;
		$scope.inv_item_master_springs['action'] = 'SELECT_INV_ITEM_MASTER_SPRINGS';
		db_inv_item_master_springs['trans'] = $scope.inv_item_master_springs;
		db_inv_item_master_springs['proc'] = 'inv_item_master_springsOps';
		$http.post('/db_data',db_inv_item_master_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_master_springsList = response.data[0];
				if (hid != undefined){
					$scope.inv_item_master_springs=response.data[0][0];
					$scope.inv_item_master_springs['action'] = 'UPDATE_INV_ITEM_MASTER_SPRINGS';
				}
				else {
					$scope.inv_item_master_springs['action'] = 'INSERT_INV_ITEM_MASTER_SPRINGS';
				}
			}
		});
	};
	select_inv_item_master_springs_record();

	$scope.save_inv_item_master_springs_record = function() {
		db_inv_item_master_springs['trans'] = $scope.inv_item_master_springs;
		db_inv_item_master_springs['proc'] = 'inv_item_master_springsOps';
		$http.post('/db_data',db_inv_item_master_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_master_springs_status = response.data[0][0].msg;
				$scope.inv_item_master_springs = {};
				db_inv_item_master_springs = {};
				hid = undefined;
				select_inv_item_master_springs_record();
			}
		});
	}

	$scope.delete_inv_item_master_springs_record = function(sysid) {
		$scope.inv_item_master_springs['sysid'] = sysid;
		$scope.inv_item_master_springs['action'] = 'DELETE_INV_ITEM_MASTER_SPRINGS';
		db_inv_item_master_springs['trans'] = $scope.inv_item_master_springs;
		db_inv_item_master_springs['proc'] = 'inv_item_master_springsOps';
		$http.post('/db_data',db_inv_item_master_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_master_springs_status = response.data[0][0].msg;
				$scope.inv_item_master_springs = {};
				db_inv_item_master_springs = {};
				select_inv_item_master_springs_record();
			}
		});
	}

	$scope.insert_inv_item_master_springs_record = function() {
		$scope.inv_item_master_springs = {status: 'Active'}
		$scope.inv_item_master_springs['action'] = 'INSERT_INV_ITEM_MASTER_SPRINGS';
		hid = undefined;
		$scope.inv_item_master_springs_status = '';
	}

	$scope.update_inv_item_master_springs_record = function(x) {
		$scope.inv_item_master_springs = x;
		$scope.inv_item_master_springs['action'] = 'UPDATE_INV_ITEM_MASTER_SPRINGS';
		hid = x['sysid'];
		$scope.inv_item_master_springs_status = '';
	}

})