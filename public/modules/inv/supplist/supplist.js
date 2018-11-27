var app = angular.module('ebs2App');
app.controller('supplistCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_supplier={};
	$scope.inv_supplierList=[];
	var db_inv_supplier={};
	$scope.admin_currencyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_supplierOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_currencyList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_supplier_record = function() {
		if (hid != undefined)
			$scope.inv_supplier['sysid'] = hid;
		$scope.inv_supplier['action'] = 'SELECT_INV_SUPPLIER';
		db_inv_supplier['trans'] = $scope.inv_supplier;
		db_inv_supplier['proc'] = 'inv_supplierOps';
		$http.post('/db_data',db_inv_supplier).success(function(response){
			if (response.error!='None'){
				$scope.inv_supplier_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_supplierList = response.data[0];
				if (hid != undefined)
					$scope.inv_supplier=response.data[0][0];
				if (hid==undefined)
					$scope.inv_supplier['action'] = 'INSERT_INV_SUPPLIER';
				else
					$scope.inv_supplier['action'] = 'UPDATE_INV_SUPPLIER';
			}
		});
	};
	select_inv_supplier_record();

	$scope.save_inv_supplier_record = function() {
		db_inv_supplier['trans'] = $scope.inv_supplier;
		db_inv_supplier['proc'] = 'inv_supplierOps';
		$http.post('/db_data',db_inv_supplier).success(function(response){
			if (response.error!='None'){
				$scope.inv_supplier_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_supplier_status = response.data[0][0].msg;
				$scope.inv_supplier = {};
				db_inv_supplier = {};
				hid = undefined;
				select_inv_supplier_record();
			}
		});
	}

	$scope.delete_inv_supplier_record = function(sysid) {
		$scope.inv_supplier['sysid'] = sysid;
		$scope.inv_supplier['action'] = 'DELETE_INV_SUPPLIER';
		db_inv_supplier['trans'] = $scope.inv_supplier;
		db_inv_supplier['proc'] = 'inv_supplierOps';
		$http.post('/db_data',db_inv_supplier).success(function(response){
			if (response.error!='None'){
				$scope.inv_supplier_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_supplier_status = response.data[0][0].msg;
				$scope.inv_supplier = {};
				db_inv_supplier = {};
				select_inv_supplier_record();
			}
		});
	}

	$scope.insert_inv_supplier_record = function() {
		$scope.inv_supplier['action'] = 'INSERT_INV_SUPPLIER';
		$scope.inv_supplier = {status: 'Active'}
		hid = undefined;
		$scope.inv_supplier_status = '';
	}

	$scope.update_inv_supplier_record = function(x) {
		$scope.inv_supplier = x;
		$scope.inv_supplier['action'] = 'UPDATE_INV_SUPPLIER';
		hid = x['sysid'];
		$scope.inv_supplier_status = '';
	}

})