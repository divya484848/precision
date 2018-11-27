var app = angular.module('ebs2App');
app.controller('op_bal_rawCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_op_bal_raw={};
	$scope.inv_op_bal_rawList=[];
	var db_inv_op_bal_raw={};
	$scope.inv_item_masterList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_op_bal_rawOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_item_masterList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_op_bal_raw_record = function() {
		if (hid != undefined)
			$scope.inv_op_bal_raw['sysid'] = hid;
		$scope.inv_op_bal_raw['action'] = 'SELECT_INV_OP_BAL_RAW';
		db_inv_op_bal_raw['trans'] = $scope.inv_op_bal_raw;
		db_inv_op_bal_raw['proc'] = 'inv_op_bal_rawOps';
		$http.post('/db_data',db_inv_op_bal_raw).success(function(response){
			if (response.error!='None'){
				$scope.inv_op_bal_raw_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_op_bal_rawList = response.data[0];
				if (hid != undefined){
					$scope.inv_op_bal_raw=response.data[0][0];
					$scope.inv_op_bal_raw['action'] = 'UPDATE_INV_OP_BAL_RAW';
				}
				else {
					$scope.inv_op_bal_raw['action'] = 'INSERT_INV_OP_BAL_RAW';
				}
			}
		});
	};
	select_inv_op_bal_raw_record();

	$scope.save_inv_op_bal_raw_record = function() {
		db_inv_op_bal_raw['trans'] = $scope.inv_op_bal_raw;
		db_inv_op_bal_raw['proc'] = 'inv_op_bal_rawOps';
		$http.post('/db_data',db_inv_op_bal_raw).success(function(response){
			if (response.error!='None'){
				$scope.inv_op_bal_raw_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_op_bal_raw_status = response.data[0][0].msg;
				$scope.inv_op_bal_raw = {};
				db_inv_op_bal_raw = {};
				hid = undefined;
				//select_inv_op_bal_raw_record();
				select_ref_record();
			}
		});
	}

	$scope.delete_inv_op_bal_raw_record = function(sysid) {
		$scope.inv_op_bal_raw['sysid'] = sysid;
		$scope.inv_op_bal_raw['action'] = 'DELETE_INV_OP_BAL_RAW';
		db_inv_op_bal_raw['trans'] = $scope.inv_op_bal_raw;
		db_inv_op_bal_raw['proc'] = 'inv_op_bal_rawOps';
		$http.post('/db_data',db_inv_op_bal_raw).success(function(response){
			if (response.error!='None'){
				$scope.inv_op_bal_raw_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_op_bal_raw_status = response.data[0][0].msg;
				$scope.inv_op_bal_raw = {};
				db_inv_op_bal_raw = {};
				select_inv_op_bal_raw_record();
			}
		});
	}

	$scope.insert_inv_op_bal_raw_record = function() {
		$scope.inv_op_bal_raw = {status: 'Active'}
		$scope.inv_op_bal_raw['action'] = 'INSERT_INV_OP_BAL_RAW';
		hid = undefined;
		$scope.inv_op_bal_raw_status = '';
	}

	$scope.update_inv_op_bal_raw_record = function(x) {
		$scope.inv_op_bal_raw = x;
		$scope.inv_op_bal_raw['action'] = 'UPDATE_INV_OP_BAL_RAW';
		hid = x['sysid'];
		$scope.inv_op_bal_raw_status = '';
	}

	$scope.updateItemData = function(rec){
		$scope.inv_op_bal_raw['item_id'] = rec.sysid;
		$scope.inv_op_bal_raw['short_code'] = rec.short_code;
		$scope.inv_op_bal_raw['item_name'] = rec.item_name;
		$scope.inv_op_bal_raw['op_bal_date'] = moment().format('YYYY-MM-DD HH:mm');
		
	}

})