var app = angular.module('ebs2App');
app.controller('item_masterCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_item_master={};
	$scope.inv_item_masterList=[];
	var db_inv_item_master={};
	$scope.inv_item_attribs={};
	$scope.inv_item_attribsList=[];
	var db_inv_item_attribs={};
	$scope.inv_item_supplier={};
	$scope.inv_item_supplierList=[];
	var db_inv_item_supplier={};
	$scope.admin_lovList=[];
	$scope.admin_lovList=[];
	$scope.admin_lovList=[];
	$scope.admin_lovList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_item_masterOps'};

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

	var select_inv_item_master_record = function() {
		if (hid != undefined)
			$scope.inv_item_master['sysid'] = hid;
		$scope.inv_item_master['action'] = 'SELECT_INV_ITEM_MASTER';
		db_inv_item_master['trans'] = $scope.inv_item_master;
		db_inv_item_master['proc'] = 'inv_item_masterOps';
		$http.post('/db_data',db_inv_item_master).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_masterList = response.data[0];
				$scope.inv_item_attribsList = response.data[1];
				$scope.inv_item_supplierList = response.data[2];
				if (hid != undefined){
					$scope.inv_item_master=response.data[0][0];
					$scope.inv_item_master['action'] = 'UPDATE_INV_ITEM_MASTER';
				}
				else {
					$scope.inv_item_master['action'] = 'INSERT_INV_ITEM_MASTER';
				}
			}
		});
	};
	select_inv_item_master_record();

	$scope.save_inv_item_master_record = function() {
		if ($scope.inv_item_master['item_name']==undefined){
			$scope.inv_item_master_status = 'Item name is mandetory..';
			return;
		}
		if ($scope.inv_item_master['short_code']==undefined){
			$scope.inv_item_master_status = 'Short code is mandetory..';
			return;
		}
		db_inv_item_master['trans'] = $scope.inv_item_master;
		db_inv_item_master['proc'] = 'inv_item_masterOps';
		$http.post('/db_data',db_inv_item_master).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_master_status = response.data[0][0].msg;
				$scope.inv_item_master = {};
				db_inv_item_master = {};
				hid = undefined;
				select_inv_item_master_record();
			}
		});
	}

	$scope.delete_inv_item_master_record = function(sysid) {
		$scope.inv_item_master['sysid'] = sysid;
		$scope.inv_item_master['action'] = 'DELETE_INV_ITEM_MASTER';
		db_inv_item_master['trans'] = $scope.inv_item_master;
		db_inv_item_master['proc'] = 'inv_item_masterOps';
		$http.post('/db_data',db_inv_item_master).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_master_status = response.data[0][0].msg;
				$scope.inv_item_master = {};
				db_inv_item_master = {};
				select_inv_item_master_record();
			}
		});
	}

	$scope.insert_inv_item_master_record = function() {
		$scope.inv_item_master = {status: 'Active'}
		$scope.inv_item_master['action'] = 'INSERT_INV_ITEM_MASTER';
		hid = undefined;
		$scope.inv_item_master_status = '';
	}

	$scope.update_inv_item_master_record = function(x) {
		$scope.inv_item_master = x;
		$scope.inv_item_master['action'] = 'UPDATE_INV_ITEM_MASTER';
		hid = x['sysid'];
		$scope.inv_item_master_status = '';
	}

	var select_inv_item_attribs_record = function() {
		$scope.inv_item_attribs[''] = $scope.trans_id;
		$scope.inv_item_attribs['action'] = 'SELECT_INV_ITEM_ATTRIBS';
		db_inv_item_attribs['trans'] = $scope.inv_item_attribs;
		db_inv_item_attribs['proc'] = 'inv_item_attribsOps';
		$http.post('/db_data',db_inv_item_attribs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_attribs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_attribsList = response.data[0];
				if ($scope.inv_item_attribsList.length>0)
					$scope.inv_item_attribs=response.data[0][0];
			}
		});
	};

	$scope.save_inv_item_attribs_record = function() {
		if ($scope.trans_id < 1){
			$scope.inv_item_attribs_status = 'Please create or select master entry..';
			return;
		}
		db_inv_item_attribs['trans'] = $scope.inv_item_attribs;
		db_inv_item_attribs['proc'] = 'inv_item_attribsOps';
		$http.post('/db_data',db_inv_item_attribs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_attribs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_attribs_status = response.data[0][0].msg;
				$scope.inv_item_attribs = {};
				db_inv_item_attribs = {};
				select_inv_item_attribs_record();
			}
		});
	}

	$scope.delete_inv_item_attribs_record = function(sysid) {
		$scope.inv_item_attribs['sysid'] = sysid;
		$scope.inv_item_attribs['action'] = 'DELETE_INV_ITEM_ATTRIBS';
		db_inv_item_attribs['trans'] = $scope.inv_item_attribs;
		db_inv_item_attribs['proc'] = 'inv_item_attribsOps';
		$http.post('/db_data',db_inv_item_attribs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_attribs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_attribs_status = response.data[0][0].msg;
				$scope.inv_item_attribs = {};
				db_inv_item_attribs = {};
				select_inv_item_attribs_record();
			}
		});
	}

	$scope.insert_inv_item_attribs_record = function() {
		$scope.inv_item_attribs = {status: 'Active'}
		$scope.inv_item_attribs['action'] = 'INSERT_INV_ITEM_ATTRIBS';
		hid = undefined;
		$scope.inv_item_attribs_status = '';
	}

	$scope.update_inv_item_attribs_record = function(x) {
		$scope.inv_item_attribs = x;
		$scope.inv_item_attribs['action'] = 'UPDATE_INV_ITEM_ATTRIBS';
		hid = x['sysid'];
		$scope.inv_item_attribs_status = '';
	}

	var select_inv_item_supplier_record = function() {
		$scope.inv_item_supplier[''] = $scope.trans_id;
		$scope.inv_item_supplier['action'] = 'SELECT_INV_ITEM_SUPPLIER';
		db_inv_item_supplier['trans'] = $scope.inv_item_supplier;
		db_inv_item_supplier['proc'] = 'inv_item_supplierOps';
		$http.post('/db_data',db_inv_item_supplier).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_supplier_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_supplierList = response.data[0];
				if ($scope.inv_item_supplierList.length>0)
					$scope.inv_item_supplier=response.data[0][0];
			}
		});
	};

	$scope.save_inv_item_supplier_record = function() {
		if ($scope.trans_id < 1){
			$scope.inv_item_supplier_status = 'Please create or select master entry..';
			return;
		}
		db_inv_item_supplier['trans'] = $scope.inv_item_supplier;
		db_inv_item_supplier['proc'] = 'inv_item_supplierOps';
		$http.post('/db_data',db_inv_item_supplier).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_supplier_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_supplier_status = response.data[0][0].msg;
				$scope.inv_item_supplier = {};
				db_inv_item_supplier = {};
				select_inv_item_supplier_record();
			}
		});
	}

	$scope.delete_inv_item_supplier_record = function(sysid) {
		$scope.inv_item_supplier['sysid'] = sysid;
		$scope.inv_item_supplier['action'] = 'DELETE_INV_ITEM_SUPPLIER';
		db_inv_item_supplier['trans'] = $scope.inv_item_supplier;
		db_inv_item_supplier['proc'] = 'inv_item_supplierOps';
		$http.post('/db_data',db_inv_item_supplier).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_supplier_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_supplier_status = response.data[0][0].msg;
				$scope.inv_item_supplier = {};
				db_inv_item_supplier = {};
				select_inv_item_supplier_record();
			}
		});
	}

	$scope.insert_inv_item_supplier_record = function() {
		$scope.inv_item_supplier = {status: 'Active'}
		$scope.inv_item_supplier['action'] = 'INSERT_INV_ITEM_SUPPLIER';
		hid = undefined;
		$scope.inv_item_supplier_status = '';
	}

	$scope.update_inv_item_supplier_record = function(x) {
		$scope.inv_item_supplier = x;
		$scope.inv_item_supplier['action'] = 'UPDATE_INV_ITEM_SUPPLIER';
		hid = x['sysid'];
		$scope.inv_item_supplier_status = '';
	}

})