var app = angular.module('ebs2App');
app.controller('prod_order_process_springsCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.prod_order_process_springs={};
	$scope.prod_order_process_springsList=[];
	var db_prod_order_process_springs={};
	$scope.prod_order_process_detail_springs={};
	$scope.prod_order_process_detail_springsList=[];
	var db_prod_order_process_detail_springs={};
	$scope.sales_so_springsList=[];
	$scope.inv_item_master_springsList=[];
	$scope.prod_order_process_springsList=[];
	$scope.inv_machines_springsList=[];
	$scope.order_detailList =[];
    $scope.temp_item_list =[];
	$scope.testList =[];
    var item_master =[];
	$scope.itemStatusList=['InProgress','PartiallyComplete','Complete'];
	$scope.orderStatusList=['InProgress','PartiallyComplete','Complete'];
	$scope.duomList=['Percent','Value'];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'prod_order_process_springsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.sales_so_springsList=response.data[0];
				$scope.inv_item_master_springsList=response.data[1];
				item_master = response.data[1];
				$scope.prod_springs_process_masterList=response.data[2];
				$scope.inv_machines_springsList=response.data[3];
				$scope.order_detailList = response.data[4];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();
	
	$scope.getItem = function(){
		console.log($scope.inv_item_master_springsList);
		console.log($scope.	sales_so_springsList);
		console.log($scope.prod_order_process_springs['order_id']);
		var order_date =_.where($scope.sales_so_springsList,{sysid: $scope.prod_order_process_springs['order_id']})[0]['so_date']; 
		$scope.prod_order_process_springs['order_date']=moment(order_date).format('YYYY-MM-DD');
		 $scope.temp_item_list = _.where($scope.order_detailList,{so_id: $scope.prod_order_process_springs['order_id']});
		$scope.inv_item_master_springsList = _.filter(item_master, function(val){
    							return _.some(this,function(val2){
        						return val2['item_id'] === val['sysid'];
   							 });
		
						}, $scope.temp_item_list);
		}

	var select_prod_order_process_springs_record = function() {
		if (hid != undefined)
			$scope.prod_order_process_springs['sysid'] = hid;
		$scope.prod_order_process_springs['action'] = 'SELECT_PROD_ORDER_PROCESS_SPRINGS';
		db_prod_order_process_springs['trans'] = $scope.prod_order_process_springs;
		db_prod_order_process_springs['proc'] = 'prod_order_process_springsOps';
		$http.post('/db_data',db_prod_order_process_springs).success(function(response){
console.log(response.data);
			if (response.error!='None'){
				$scope.prod_order_process_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_order_process_springsList = response.data[0];
				$scope.prod_order_process_detail_springsList = response.data[1];
				if (hid != undefined){
					$scope.prod_order_process_springs=response.data[0][0];
					$scope.getItem();
				}
			}
		});
	};
	if (hid != undefined)
		select_prod_order_process_springs_record();

	$scope.save_prod_order_process_springs_record = function() {
		if (hid != undefined){
			$scope.prod_order_process_springs['action'] = 'UPDATE_PROD_ORDER_PROCESS_SPRINGS';
		}
		else {
			$scope.prod_order_process_springs['action'] = 'INSERT_PROD_ORDER_PROCESS_SPRINGS';
		}
		db_prod_order_process_springs['trans'] = $scope.prod_order_process_springs;
		db_prod_order_process_springs['proc'] = 'prod_order_process_springsOps';
		$http.post('/db_data',db_prod_order_process_springs).success(function(response){
			if (response.error!='None'){
				$scope.prod_order_process_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_order_process_springs_status = response.data[0][0].msg;
				$scope.prod_order_process_springs['sysid']=response.data[1][0].trans_id;
				$scope.trans_id = response.data[1][0].trans_id;
				//select_prod_order_process_springs_record();
			}
		});
	}

	$scope.delete_prod_order_process_springs_record = function(sysid) {
		$scope.prod_order_process_springs['sysid'] = sysid;
		$scope.prod_order_process_springs['action'] = 'DELETE_PROD_ORDER_PROCESS_SPRINGS';
		db_prod_order_process_springs['trans'] = $scope.prod_order_process_springs;
		db_prod_order_process_springs['proc'] = 'prod_order_process_springsOps';
		$http.post('/db_data',db_prod_order_process_springs).success(function(response){
			if (response.error!='None'){
				$scope.prod_order_process_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_order_process_springs_status = response.data[0][0].msg;
				select_prod_order_process_springs_record();
			}
		});
	}

	$scope.insert_prod_order_process_springs_record = function() {
		$scope.prod_order_process_springs = {status: 'Active'}
		$scope.prod_order_process_springs['action'] = 'INSERT_PROD_ORDER_PROCESS_SPRINGS';
		//hid = undefined;
		$scope.prod_order_process_springs_status = '';
	}

	$scope.update_prod_order_process_springs_record = function(x) {
		$scope.prod_order_process_springs = x;
		$scope.prod_order_process_springs['action'] = 'UPDATE_PROD_ORDER_PROCESS_SPRINGS';
		hid = x['sysid'];
		$scope.prod_order_process_springs_status = '';
	}

	var select_prod_order_process_detail_springs_record = function() {
		$scope.prod_order_process_detail_springs['order_process_id'] = $scope.trans_id;
		$scope.prod_order_process_detail_springs['action'] = 'SELECT_PROD_ORDER_PROCESS_DETAIL_SPRINGS';
		db_prod_order_process_detail_springs['trans'] = $scope.prod_order_process_detail_springs;
		db_prod_order_process_detail_springs['proc'] = 'prod_order_process_springsOps';
		$http.post('/db_data',db_prod_order_process_detail_springs).success(function(response){
			if (response.error!='None'){
				$scope.prod_order_process_detail_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_order_process_detail_springsList = response.data[0];
				if ($scope.prod_order_process_detail_springsList.length>0)
					$scope.prod_order_process_detail_springs=response.data[0][0];
			}
		});
	};

	$scope.save_prod_order_process_detail_springs_record = function() {
		if ($scope.trans_id < 1){
			$scope.prod_order_process_detail_springs_status = 'Please create or select master entry..';
			return;
		}
		db_prod_order_process_detail_springs['trans'] = $scope.prod_order_process_detail_springs;
		db_prod_order_process_detail_springs['proc'] = 'prod_order_process_springsOps';
		$http.post('/db_data',db_prod_order_process_detail_springs).success(function(response){
			if (response.error!='None'){
				$scope.prod_order_process_detail_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_order_process_detail_springs_status = response.data[0][0].msg;
				$scope.prod_order_process_detail_springs = {};
				db_prod_order_process_detail_springs = {};
				select_prod_order_process_springs_record();
			}
		});
	}

	$scope.delete_prod_order_process_detail_springs_record = function(sysid) {
		$scope.prod_order_process_detail_springs['sysid'] = sysid;
		$scope.prod_order_process_detail_springs['action'] = 'DELETE_PROD_ORDER_PROCESS_DETAIL_SPRINGS';
		db_prod_order_process_detail_springs['trans'] = $scope.prod_order_process_detail_springs;
		db_prod_order_process_detail_springs['proc'] = 'prod_order_process_springsOps';
		$http.post('/db_data',db_prod_order_process_detail_springs).success(function(response){
			if (response.error!='None'){
				$scope.prod_order_process_detail_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.prod_order_process_detail_springs_status = response.data[0][0].msg;
				$scope.prod_order_process_detail_springs = {};
				db_prod_order_process_detail_springs = {};
				select_prod_order_process_detail_springs_record();
			}
		});
	}

	$scope.insert_prod_order_process_detail_springs_record = function() {
		$scope.prod_order_process_detail_springs['order_process_id'] = $scope.prod_order_process_springs['sysid'];
		$scope.prod_order_process_detail_springs['status'] = 'Active';
		$scope.prod_order_process_detail_springs['action'] = 'INSERT_PROD_ORDER_PROCESS_DETAIL_SPRINGS';
		hid = undefined;
		$scope.prod_order_process_detail_springs_status = '';
	}

	$scope.update_prod_order_process_detail_springs_record = function(x) {
		$scope.prod_order_process_detail_springs = x;
		$scope.prod_order_process_detail_springs['order_process_id'] = $scope.prod_order_process_springs['sysid'];
		$scope.prod_order_process_detail_springs['action'] = 'UPDATE_PROD_ORDER_PROCESS_DETAIL_SPRINGS';
		//hid = x['sysid'];
		$scope.prod_order_process_detail_springs_status = '';
	}

})