var app = angular.module('ebs2App');
app.controller('prod_matCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.prod_product_assembly={};
	$scope.prod_product_assemblyList=[];
	var db_prod_product_assembly={};
	$scope.prod_product_assembly_details={};
	$scope.prod_product_assembly_detailsList=[];
	var db_prod_product_assembly_details={};
	$scope.inv_item_masterList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'prod_product_assemblyOps'};

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

	var select_prod_product_assembly_record = function() {
		if (hid != undefined)
			$scope.prod_product_assembly['sysid'] = hid;
		$scope.prod_product_assembly['action'] = 'SELECT_PROD_PRODUCT_ASSEMBLY';
		db_prod_product_assembly['trans'] = $scope.prod_product_assembly;
		db_prod_product_assembly['proc'] = 'prod_product_assemblyOps';
		$http.post('/db_data',db_prod_product_assembly).success(function(response){
			if (response.error!='None'){
				$scope.prod_product_assembly_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_product_assemblyList = response.data[0];
				$scope.prod_product_assembly_detailsList = response.data[1];
				if (hid != undefined){
					$scope.prod_product_assembly=response.data[0][0];
				}
			}
		});
	};
	if (hid != undefined){
		select_prod_product_assembly_record();
	}

	$scope.save_prod_product_assembly_record = function() {
		if (hid != undefined){
			$scope.prod_product_assembly['action'] = 'UPDATE_PROD_PRODUCT_ASSEMBLY';
		}
		else {
			$scope.prod_product_assembly['action'] = 'INSERT_PROD_PRODUCT_ASSEMBLY';
		}
		db_prod_product_assembly['trans'] = $scope.prod_product_assembly;
		db_prod_product_assembly['proc'] = 'prod_product_assemblyOps';
		$http.post('/db_data',db_prod_product_assembly).success(function(response){
			if (response.error!='None'){
				$scope.prod_product_assembly_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_product_assembly_status = response.data[0][0].msg;
				$scope.prod_product_assembly['sysid'] = response.data[1][0].trans_id;
				$scope.trans_id = response.data[1][0].trans_id;
			}
		});
	}

	$scope.delete_prod_product_assembly_record = function(sysid) {
		$scope.prod_product_assembly['sysid'] = sysid;
		$scope.prod_product_assembly['action'] = 'DELETE_PROD_PRODUCT_ASSEMBLY';
		db_prod_product_assembly['trans'] = $scope.prod_product_assembly;
		db_prod_product_assembly['proc'] = 'prod_product_assemblyOps';
		$http.post('/db_data',db_prod_product_assembly).success(function(response){
			if (response.error!='None'){
				$scope.prod_product_assembly_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.prod_product_assembly_status = response.data[0][0].msg;
				$scope.prod_product_assembly = {};
				db_prod_product_assembly = {};
				select_prod_product_assembly_record();
			}
		});
	}

	$scope.insert_prod_product_assembly_record = function() {
		$scope.prod_product_assembly = {status: 'Active'}
		$scope.prod_product_assembly['action'] = 'INSERT_PROD_PRODUCT_ASSEMBLY';
		hid = undefined;
		$scope.prod_product_assembly_status = '';
	}

	$scope.update_prod_product_assembly_record = function(x) {
		$scope.prod_product_assembly = x;
		$scope.prod_product_assembly['action'] = 'UPDATE_PROD_PRODUCT_ASSEMBLY';
		hid = x['sysid'];
		$scope.prod_product_assembly_status = '';
	}

	var select_prod_product_assembly_details_record = function() {
		$scope.prod_product_assembly_details['fin_item_id'] = $scope.trans_id;
		$scope.prod_product_assembly_details['action'] = 'SELECT_PROD_PRODUCT_ASSEMBLY_DETAILS';
		db_prod_product_assembly_details['trans'] = $scope.prod_product_assembly_details;
		db_prod_product_assembly_details['proc'] = 'prod_product_assemblyOps';
		$http.post('/db_data',db_prod_product_assembly_details).success(function(response){
			if (response.error!='None'){
				$scope.prod_product_assembly_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_product_assembly_detailsList = response.data[0];
				if ($scope.prod_product_assembly_detailsList.length>0)
					$scope.prod_product_assembly_details=response.data[0][0];
			}
		});
	};

	$scope.save_prod_product_assembly_details_record = function() {
		if ($scope.trans_id < 1){
			$scope.prod_product_assembly_details_status = 'Please create or select master entry..';
			return;
		}
		db_prod_product_assembly_details['trans'] = $scope.prod_product_assembly_details;
		db_prod_product_assembly_details['proc'] = 'prod_product_assemblyOps';
		$http.post('/db_data',db_prod_product_assembly_details).success(function(response){
			if (response.error!='None'){
				$scope.prod_product_assembly_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_product_assembly_details_status = response.data[0][0].msg;
				$scope.prod_product_assembly_details = {};
				db_prod_product_assembly_details = {};
				select_prod_product_assembly_record();
			}
		});
	}

	$scope.delete_prod_product_assembly_details_record = function(sysid) {
		$scope.prod_product_assembly_details['sysid'] = sysid;
		$scope.prod_product_assembly_details['action'] = 'DELETE_PROD_PRODUCT_ASSEMBLY_DETAILS';
		db_prod_product_assembly_details['trans'] = $scope.prod_product_assembly_details;
		db_prod_product_assembly_details['proc'] = 'prod_product_assemblyOps';
		$http.post('/db_data',db_prod_product_assembly_details).success(function(response){
			if (response.error!='None'){
				$scope.prod_product_assembly_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.prod_product_assembly_details_status = response.data[0][0].msg;
				$scope.prod_product_assembly_details = {};
				db_prod_product_assembly_details = {};
				select_prod_product_assembly_record();
			}
		});
	}

	$scope.insert_prod_product_assembly_details_record = function() {
		$scope.prod_product_assembly_details = {fin_item_id: $scope.prod_product_assembly['sysid'], status: 'Active'}
		$scope.prod_product_assembly_details['action'] = 'INSERT_PROD_PRODUCT_ASSEMBLY_DETAILS';
		$scope.prod_product_assembly_details_status = '';
	}

	$scope.update_prod_product_assembly_details_record = function(x) {
		$scope.prod_product_assembly_details = x;
		$scope.prod_product_assembly_details['action'] = 'UPDATE_PROD_PRODUCT_ASSEMBLY_DETAILS';
		$scope.prod_product_assembly_details_status = '';
	}

	$scope.update_wt = function(){
		var wt = _.where($scope.inv_item_masterList,{sysid: $scope.prod_product_assembly_details['comp_item_id']})[0]['unit_wt'];
		$scope.prod_product_assembly_details['item_wt']=parseFloat($scope.prod_product_assembly_details['item_qty'])*wt;
	}

})