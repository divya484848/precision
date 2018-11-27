var app = angular.module('ebs2App');
app.controller('prod_packingCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.prod_spring_trans={};
	$scope.prod_spring_transList=[];
	$scope.sales_packing_list_springs={};
	var db_sales_packing_list_springs={};
	$scope.sales_packing_details={};
	var db_sales_packing_details ={};
    $scope.salesPackingList =[];
	var db_prod_spring_trans={};
	var db_itemDetlist ={};
    $scope.prod_itemDetlist =[];
	$scope.sales_so_springsList=[];
	$scope.inv_item_master_springsList=[];
	$scope.prod_springs_process_masterList=[];
	$scope.hrms_employeesList=[];
	$scope.itemDetlist =[];
	$scope.curr_so = 0;
	$scope.select_so = '';
	$scope.prod_itemDetlist_status ='';
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'prod_spring_transOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.sales_so_springsList=response.data[0];
				$scope.inv_item_master_springsList=response.data[1];
				$scope.prod_springs_process_masterList=response.data[2];
				$scope.hrms_employeesList=response.data[3];

			if ($scope.sales_so_springsList.length > 0){
					$scope.curr_so = $scope.sales_so_springsList[0]['sysid'];
					$scope.select_so = $scope.sales_so_springsList[0]['so_no'];
					$scope.prod_spring_trans['ord_id'] = $scope.curr_so;
					$scope.select_prod_spring_trans_record($scope.curr_so);
				}
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	$scope.select_prod_spring_trans_record = function(sysid) {
		if ($scope.curr_so == undefined){
			$scope.prod_spring_trans_status = 'Please select order.';
			return;
		}
		if (sysid == undefined)
			sysid = $scope.curr_so;
		 $scope.prod_itemDetlist =[];
		
		$scope.prod_spring_trans['to_proc_id'] =1;
		$scope.prod_spring_trans['ord_id'] = sysid;
		$scope.prod_spring_trans['action'] = 'PROD_PACKING';
		db_prod_spring_trans['trans'] = $scope.prod_spring_trans;
		db_prod_spring_trans['proc'] = 'prod_spring_transOps';
		$http.post('/db_data',db_prod_spring_trans).success(function(response){
		console.log(response.data);
			if (response.error!='None'){
				$scope.prod_spring_trans_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_spring_transList = response.data[0];
				console.log(response.data[0]);	
				$scope.select_so = 	_.where($scope.sales_so_springsList,{sysid:$scope.prod_spring_transList[0]['so_id'] })[0]['so_no'];
				console.log($scope.select_so);
				//$scope.getItemdet($scope.prod_spring_transList);


				}
		});
	};
	//if ( $scope.prod_spring_transList == undefined)
		$scope.select_prod_spring_trans_record();

	$scope.getItemdet = function(x){
	$scope.itemDetlist = x;
	$scope.itemDetlist['to_proc_id'] = $scope.prod_spring_trans['to_proc_id'];
	$scope.itemDetlist['ord_id'] = $scope.itemDetlist['so_id'] ;
	$scope.itemDetlist['action'] = 'PROD_GET_ITEM_DETAILS';
		db_itemDetlist['trans'] = $scope.itemDetlist;
		db_itemDetlist['proc'] = 'prod_spring_transOps';
		$http.post('/db_data',db_itemDetlist).success(function(response){
			if (response.error!='None'){
				$scope.prod_itemDetlist_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_itemDetlist = response.data[0];
				//$scope.prod_itemDetlist ['trans_date'] = moment($scope.prod_itemDetlist ['trans_date']).format('YYYY-MM-DD HH:mm');
console.log($scope.prod_itemDetlist);

				}
	})
	}

	$scope.save_prod_spring_trans_record = function() {
		console.log($scope.prod_spring_trans);
		db_prod_spring_trans['trans'] = $scope.prod_spring_trans;
		db_prod_spring_trans['proc'] = 'prod_spring_transOps';
		$http.post('/db_data',db_prod_spring_trans).success(function(response){
			if (response.error!='None'){
				$scope.prod_spring_trans_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_spring_trans_status = response.data[0][0].msg;
				//$scope.prod_spring_trans = {};
				//db_prod_spring_trans = {};
				//hid = undefined;
				$scope.select_prod_spring_trans_record();
			}
		});
	}

	$scope.delete_prod_spring_trans_record = function(sysid) {
		$scope.prod_spring_trans['sysid'] = sysid;
		$scope.prod_spring_trans['action'] = 'DELETE_PROD_SPRING_TRANS';
		db_prod_spring_trans['trans'] = $scope.prod_spring_trans;
		db_prod_spring_trans['proc'] = 'prod_spring_transOps';
		$http.post('/db_data',db_prod_spring_trans).success(function(response){
			if (response.error!='None'){
				$scope.prod_spring_trans_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.prod_spring_trans_status = response.data[0][0].msg;
				$scope.prod_spring_trans = {};
				db_prod_spring_trans = {};
				$scope.select_prod_spring_trans_record();
			}
		});
	}

	$scope.insert_prod_spring_trans_record = function(x) {
		$scope.prod_spring_trans = x;
		$scope.prod_spring_trans['to_proc_id'] = 1;
		$scope.prod_spring_trans['ord_id'] = $scope.prod_spring_trans['so_id'];
		$scope.prod_spring_trans['trans_date'] = moment().format('YYYY-MM-DD HH:mm');
		$scope.prod_spring_trans['action'] = 'INSERT_PROD_SPRING_TRANS';
		$scope.prod_spring_trans_status = '';
		console.log($scope.prod_spring_trans);
	}
	
	$scope.insert_prod_spring_transfer_record = function(x) {
		$scope.prod_spring_trans = x;
		$scope.prod_spring_trans['from_proc_id'] = 1;
		$scope.prod_spring_trans['ord_id'] = $scope.prod_spring_trans['so_id'];
		$scope.prod_spring_trans['trans_date'] = moment().format('YYYY-MM-DD HH:mm');
		$scope.prod_spring_trans['action'] = 'INSERT_PROD_SPRING_TRANS';
		$scope.prod_spring_trans_status = '';
		console.log($scope.prod_spring_trans);
	}

	$scope.update_prod_spring_trans_record = function(x) {
		$scope.prod_spring_trans = x;
		$scope.prod_spring_trans['to_proc_id'] = 1;
		$scope.prod_spring_trans['ord_id'] = $scope.prod_spring_trans['so_id'];
		$scope.prod_spring_trans['action'] = 'UPDATE_PROD_SPRING_TRANS';
		//hid = x['sysid'];
		$scope.prod_spring_trans_status = '';
	}
	$scope.insert_prod_spring_packing_record = function(x) {
		console.log(x);
		$scope.sales_packing_list_springs = '';
		$scope.sales_packing_list_springs = x;
		$scope.sales_packing_list_springs['total_gross_wt']= 0;
		$scope.sales_packing_list_springs['total_qty']= 0;
		$scope.sales_packing_list_springs['wt_per_unit']=0;
		$scope.sales_packing_list_springs['unit_rate']=0;

		console.log($scope.sales_packing_list_springs);
		$scope.sales_packing_list_springs['from_proc_id'] = 5;
		$scope.sales_packing_list_springs['order_id'] = $scope.sales_packing_list_springs['so_id'];
		$scope.sales_packing_list_springs['trans_date'] = moment().format('YYYY-MM-DD HH:mm');
		$scope.sales_packing_list_springs['action'] = 'INSERT_SALES_PACKING_LIST_SPRINGS';
		$scope.sales_packing_list_springs_status = '';
		console.log($scope.sales_packing_list_springs);
	}

	$scope.update_prod_spring_packing_record = function(x) {
		$scope.sales_packing_list_springs = '';
		$scope.sales_packing_list_springs = x;
		$scope.sales_packing_list_springs['to_proc_id'] = 5;
		$scope.sales_packing_list_springs['order_id'] = $scope.sales_packing_list_springs['so_id'];
		$scope.sales_packing_list_springs['action'] = 'UPDATE_SALES_PACKING_LIST_SPRINGS';
		//hid = x['sysid'];
		$scope.sales_packing_list_springs = '';
	}

	$scope.save_prod_spring_packing_record = function() {
		console.log($scope.sales_packing_list_springs);
		db_sales_packing_list_springs['trans'] = $scope.sales_packing_list_springs;
		db_sales_packing_list_springs['proc'] = 'prod_spring_transOps';
		$http.post('/db_data',db_sales_packing_list_springs).success(function(response){
			if (response.error!='None'){
				$scope.sales_packing_list_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_packing_list_springs_status = response.data[0][0].msg;
				//$scope.prod_spring_trans = {};
				//db_prod_spring_trans = {};
				//hid = undefined;
				$scope.select_prod_spring_trans_record();
			}
		});
	}
	
	$scope.item_qty = function() {
	$scope.sales_packing_list_springs['total_qty']=$scope.sales_packing_list_springs['no_of_packets']*			 $scope.sales_packing_list_springs['qty_per_packet'];
$scope.sales_packing_list_springs['total_gross_wt']=$scope.sales_packing_list_springs['total_qty']*	$scope.sales_packing_list_springs['wt_per_unit'];
$scope.sales_packing_list_springs['item_value']=$scope.sales_packing_list_springs['total_qty']*	$scope.sales_packing_list_springs['unit_rate'];
	}

$scope.packing_details = function(x){
	$scope.sales_packing_details = {};
	$scope.salesPackingList =[];
	$scope.sales_packing_details = x;
	console.log($scope.sales_packing_details);
		$scope.sales_packing_details['order_id'] = $scope.sales_packing_details['so_id'];
		$scope.sales_packing_details['action'] = 'SELECT_PACKING_DETAILS';
		db_sales_packing_details['trans'] = $scope.sales_packing_details;
		db_sales_packing_details['proc'] = 'prod_spring_transOps';
		$http.post('/db_data',db_sales_packing_details).success(function(response){
			if (response.error!='None'){
				$scope.sales_packing_details_status = '';
				console.log(response);
			}
			else{
				$scope.sales_packing_list_springs_status = '';
				console.log(response);
				$scope.salesPackingList = response.data[0];
				//$scope.prod_spring_trans = {};
				//db_prod_spring_trans = {};
				//hid = undefined;
				//$scope.select_prod_spring_trans_record();
			}
		});
}
	

})