var app = angular.module('ebs2App');
app.controller('sales_order_springsCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.sales_so_springs={};
	$scope.sales_so_springsList=[];
	var db_sales_so_springs={};
	$scope.sales_so_springs_details={};
	$scope.sales_so_springs_detailsList=[];
	var db_sales_so_springs_details={};
	$scope.inv_customer_springsList=[];
	$scope.sales_so_springsList=[];
	$scope.inv_item_master_springsList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_so_springsOps'};
	$scope.soTypeList=['One-time','Recurring','Blanket'];
	$scope.channelList=['Email','Paper-copy','Verbal','Online'];
	$scope.delModeList=['Shipment','Courier','In-person','Outsourced'];
	$scope.statusList=['Prepared','In-process','On-hold','Cancelled','Completed'];
	$scope.duomList=['Percent','Value'];
	$scope.statusList=['Active','Inactive'];

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
				console.log(response);
			if (response.error=='None'){
				$scope.inv_customer_springsList=response.data[0];
				$scope.sales_so_springsList=response.data[1];
				$scope.inv_item_master_springsList=response.data[1];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_sales_so_springs_record = function() {
		if (hid != undefined)
			$scope.sales_so_springs['sysid'] = hid;
			$scope.sales_so_springs_details['so_id'] = $scope.sales_so_springs['sysid'];
		$scope.sales_so_springs['action'] = 'SELECT_SALES_SO_SPRINGS';
		db_sales_so_springs['trans'] = $scope.sales_so_springs;
		db_sales_so_springs['proc'] = 'sales_so_springsOps';
		$http.post('/db_data',db_sales_so_springs).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_so_springsList = response.data[0];
				$scope.sales_so_springs_detailsList = response.data[1];
				if (hid != undefined){
					$scope.sales_so_springs=response.data[0][0];
					$scope.sales_so_springs['action'] = 'UPDATE_SALES_SO_SPRINGS';
					$scope.sales_so_springs_details['so_id'] = $scope.sales_so_springs['sysid'];
				}
				else {
					$scope.sales_so_springs['action'] = 'INSERT_SALES_SO_SPRINGS';
					$scope.sales_so_springs_details['so_id'] = $scope.trans_id;
				}
			}
			 select_sales_so_springs_details_record();
		});
	};
	select_sales_so_springs_record();

	$scope.save_sales_so_springs_record = function() {
		db_sales_so_springs['trans'] = $scope.sales_so_springs;
		db_sales_so_springs['proc'] = 'sales_so_springsOps';
		$http.post('/db_data',db_sales_so_springs).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_so_springs_status = response.data[0][0].msg;
				$scope.sales_so_springs_details['so_id'] = response.data[1][0].trans_id;
				$scope.trans_id = response.data[1][0].trans_id;
				//$scope.sales_so_springs = {};
				//db_sales_so_springs = {};
				//hid = undefined;
				select_sales_so_springs_record();
			}
		});
	}

	$scope.delete_sales_so_springs_record = function(sysid) {
		$scope.sales_so_springs['sysid'] = sysid;
		$scope.sales_so_springs['action'] = 'DELETE_SALES_SO_SPRINGS';
		db_sales_so_springs['trans'] = $scope.sales_so_springs;
		db_sales_so_springs['proc'] = 'sales_so_springsOps';
		$http.post('/db_data',db_sales_so_springs).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.sales_so_springs_status = response.data[0][0].msg;
				//$scope.sales_so_springs = {};
				//db_sales_so_springs = {};
				select_sales_so_springs_record();
			}
		});
	}

	$scope.insert_sales_so_springs_record = function() {
		$scope.sales_so_springs = {status: 'Active'};
		$scope.sales_so_springs['action'] = 'INSERT_SALES_SO_SPRINGS';
		//hid = undefined;
		//$scope.sales_so_springs_status = '';
	}

	$scope.update_sales_so_springs_record = function(x) {
		$scope.sales_so_springs = x;
		$scope.sales_so_springs['action'] = 'UPDATE_SALES_SO_SPRINGS';
		hid = x['sysid'];
		$scope.sales_so_springs_details['so_id'] = x['sysid'];
		select_sales_so_springs_details_record();
		//$scope.sales_so_springs_status = '';
	}

	var select_sales_so_springs_details_record = function() {
		//$scope.sales_so_springs_details['so_id'] = $scope.trans_id;
		$scope.sales_so_springs_details['action'] = 'SELECT_SALES_SO_SPRINGS_DETAILS_SOID';
		db_sales_so_springs_details['trans'] = $scope.sales_so_springs_details;
		db_sales_so_springs_details['proc'] = 'sales_so_springsOps';
		$http.post('/db_data',db_sales_so_springs_details).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_springs_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_so_springs_detailsList = response.data[0];
				if ($scope.sales_so_springs_detailsList.length>0)
					$scope.sales_so_springs_details=response.data[0][0];
			}
		});
	};

	$scope.save_sales_so_springs_details_record = function() {
		if ($scope.trans_id < 1){
			$scope.sales_so_springs_details_status = 'Please create or select master entry..';
			return;
		}
		db_sales_so_springs_details['trans'] = $scope.sales_so_springs_details;
		db_sales_so_springs_details['proc'] = 'sales_so_springsOps';
		$http.post('/db_data',db_sales_so_springs_details).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_springs_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_so_springs_details_status = response.data[0].msg;
				//$scope.sales_so_springs_details = {};
				//db_sales_so_springs_details = {};
				select_sales_so_springs_details_record();
			}
		});
	}

	$scope.delete_sales_so_springs_details_record = function(sysid) {
		$scope.sales_so_springs_details['sysid'] = sysid;
		$scope.sales_so_springs_details['action'] = 'DELETE_SALES_SO_SPRINGS_DETAILS';
		db_sales_so_springs_details['trans'] = $scope.sales_so_springs_details;
		db_sales_so_springs_details['proc'] = 'sales_so_springsOps';
		$http.post('/db_data',db_sales_so_springs_details).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_springs_details_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.sales_so_springs_details_status = response.data[0][0].msg;
				$scope.sales_so_springs_details = {};
				db_sales_so_springs_details = {};
				select_sales_so_springs_details_record();
			}
		});
	}

	$scope.insert_sales_so_springs_details_record = function() {
		$scope.sales_so_springs_details = {status: 'Active'};
		$scope.sales_so_springs_details['so_id'] = $scope.sales_so_springs['sysid'];
		$scope.sales_so_springs_details['action'] = 'INSERT_SALES_SO_SPRINGS_DETAILS';
		//hid = undefined;
		//$scope.sales_so_springs_details_status = '';
	}

	$scope.update_sales_so_springs_details_record = function(x) {
		$scope.sales_so_springs_details = x;
		$scope.sales_so_springs_details['action'] = 'UPDATE_SALES_SO_SPRINGS_DETAILS';
		hid = x['sysid'];
		//$scope.sales_so_springs_details_status = '';
	}

$scope.update_item_value = function(){
		$scope.sales_so_springs_details['item_value'] = $scope.sales_so_springs_details['unit_rate']*$scope.sales_so_springs_details['so_qty']; 
	}

	$scope.update_discount = function(){
		var qty = $scope.sales_so_springs_details['so_qty'];
		var rate = $scope.sales_so_springs_details['unit_rate'];
		var discount = $scope.sales_so_springs_details['discount'];
		var val = qty*rate;
		if ($scope.sales_so_springs_details['discount_uom']=="Percent"){
			$scope.sales_so_springs_details['item_value'] = val-val*discount/100; 
		}
		else{
			$scope.sales_so_springs_details['item_value'] = val-discount; 
		}
	}

})