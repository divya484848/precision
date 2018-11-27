var app = angular.module('ebs2App');
app.controller('supp_itemsCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_vendor_items={};
	$scope.inv_vendor_itemsList=[];
	var db_inv_vendor_items={};
	$scope.inv_supplierList=[];
	$scope.inv_item_masterList=[];
	$scope.inv_supp_processList=[];
	$scope.admin_currencyList=[];
	$scope.hrms_employeesList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_vendor_itemsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_supplierList=response.data[0];
				$scope.inv_item_masterList=response.data[1];
				$scope.inv_supp_processList=response.data[2];
				$scope.admin_currencyList=response.data[3];
				$scope.hrms_employeesList=response.data[4];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_vendor_items_record = function() {
		if (hid != undefined)
			$scope.inv_vendor_items['sysid'] = hid;
		$scope.inv_vendor_items['action'] = 'SELECT_INV_VENDOR_ITEMS';
		db_inv_vendor_items['trans'] = $scope.inv_vendor_items;
		db_inv_vendor_items['proc'] = 'inv_vendor_itemsOps';
		$http.post('/db_data',db_inv_vendor_items).success(function(response){
			if (response.error!='None'){
				$scope.inv_vendor_items_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_vendor_itemsList = response.data[0];
				if (hid != undefined){
					$scope.inv_vendor_items=response.data[0][0];
					$scope.inv_vendor_items['action'] = 'UPDATE_INV_VENDOR_ITEMS';
				}
				else {
					$scope.inv_vendor_items['action'] = 'INSERT_INV_VENDOR_ITEMS';
				}
			}
		});
	};
	select_inv_vendor_items_record();

	$scope.save_inv_vendor_items_record = function() {
		db_inv_vendor_items['trans'] = $scope.inv_vendor_items;
		db_inv_vendor_items['proc'] = 'inv_vendor_itemsOps';
		$http.post('/db_data',db_inv_vendor_items).success(function(response){
			if (response.error!='None'){
				$scope.inv_vendor_items_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_vendor_items_status = response.data[0][0].msg;
				$scope.inv_vendor_items = {curr_id: 1, status: 'Active', rate_start_date: db_inv_vendor_items['trans']['rate_start_date'], 
					rate_end_date: db_inv_vendor_items['trans']['rate_end_date'], qty_uom: db_inv_vendor_items['trans']['qty_uom']};
				db_inv_vendor_items = {};
				hid = undefined;
				select_inv_vendor_items_record();
			}
		});
	}

	$scope.delete_inv_vendor_items_record = function(sysid) {
		$scope.inv_vendor_items['sysid'] = sysid;
		$scope.inv_vendor_items['action'] = 'DELETE_INV_VENDOR_ITEMS';
		db_inv_vendor_items['trans'] = $scope.inv_vendor_items;
		db_inv_vendor_items['proc'] = 'inv_vendor_itemsOps';
		$http.post('/db_data',db_inv_vendor_items).success(function(response){
			if (response.error!='None'){
				$scope.inv_vendor_items_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_vendor_items_status = response.data[0][0].msg;
				$scope.inv_vendor_items = {};
				db_inv_vendor_items = {};
				select_inv_vendor_items_record();
			}
		});
	}

	$scope.insert_inv_vendor_items_record = function() {
		$scope.inv_vendor_items = {curr_id: 1, status: 'Active'}
		$scope.inv_vendor_items['action'] = 'INSERT_INV_VENDOR_ITEMS';
		hid = undefined;
		$scope.inv_vendor_items_status = '';
	}

	$scope.update_inv_vendor_items_record = function(x) {
		$scope.inv_vendor_items = x;
		$scope.inv_vendor_items['action'] = 'UPDATE_INV_VENDOR_ITEMS';
		hid = x['sysid'];
		$scope.inv_vendor_items_status = '';
	}

	$scope.set_end_date = function() {
		if ($scope.inv_vendor_items['rate_start_date'] != undefined){
			$scope.inv_vendor_items['rate_end_date'] = moment($scope.inv_vendor_items['rate_start_date'],'YYYY-MM-DD').add(365,'days').format('YYYY-MM-DD');
		}
	}

})