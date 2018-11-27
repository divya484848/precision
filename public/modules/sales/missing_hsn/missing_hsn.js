var app = angular.module('ebs2App');
app.controller('missing_hsnCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_finished_goods={};
	$scope.inv_finished_goodsList=[];
	var db_inv_finished_goods={};
	$scope.inv_customerList=[];
	$scope.admin_currencyList=[];
	$scope.inv_item_masterList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_finished_goodsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_customerList=response.data[0];
				$scope.admin_currencyList=response.data[1];
				$scope.inv_item_masterList=response.data[2];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_finished_goods_record = function() {
		if (hid != undefined)
			$scope.inv_finished_goods['sysid'] = hid;
		$scope.inv_finished_goods['action'] = 'MISSING_HSN';
		db_inv_finished_goods['trans'] = $scope.inv_finished_goods;
		db_inv_finished_goods['proc'] = 'sales_reportsOps';
		$http.post('/db_data',db_inv_finished_goods).success(function(response){
			if (response.error!='None'){
				$scope.inv_finished_goods_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_finished_goodsList = response.data[0];
				if (hid != undefined){
					$scope.inv_finished_goods=response.data[0][0];
					$scope.inv_finished_goods['action'] = 'UPDATE_INV_FINISHED_GOODS';
				}
				else {
					$scope.inv_finished_goods['action'] = 'INSERT_INV_FINISHED_GOODS';
				}
			}
		});
	};
	select_inv_finished_goods_record();

	$scope.save_inv_finished_goods_record = function() {
		db_inv_finished_goods['trans'] = $scope.inv_finished_goods;
		db_inv_finished_goods['proc'] = 'inv_finished_goodsOps';
		$http.post('/db_data',db_inv_finished_goods).success(function(response){
			if (response.error!='None'){
				$scope.inv_finished_goods_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_finished_goods_status = response.data[0][0].msg;
				$scope.inv_finished_goods = {};
				db_inv_finished_goods = {};
				hid = undefined;
				select_inv_finished_goods_record();
			}
		});
	}

	$scope.delete_inv_finished_goods_record = function(sysid) {
		$scope.inv_finished_goods['sysid'] = sysid;
		$scope.inv_finished_goods['action'] = 'DELETE_INV_FINISHED_GOODS';
		db_inv_finished_goods['trans'] = $scope.inv_finished_goods;
		db_inv_finished_goods['proc'] = 'inv_finished_goodsOps';
		$http.post('/db_data',db_inv_finished_goods).success(function(response){
			if (response.error!='None'){
				$scope.inv_finished_goods_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_finished_goods_status = response.data[0][0].msg;
				$scope.inv_finished_goods = {};
				db_inv_finished_goods = {};
				select_inv_finished_goods_record();
			}
		});
	}

	$scope.insert_inv_finished_goods_record = function() {
		$scope.inv_finished_goods = {status: 'Active'}
		$scope.inv_finished_goods['action'] = 'INSERT_INV_FINISHED_GOODS';
		hid = undefined;
		$scope.inv_finished_goods_status = '';
	}

	$scope.update_inv_finished_goods_record = function(x) {
		$scope.inv_finished_goods = x;
		$scope.inv_finished_goods['action'] = 'UPDATE_INV_FINISHED_GOODS';
		hid = x['sysid'];
		$scope.inv_finished_goods_status = '';
	}

})