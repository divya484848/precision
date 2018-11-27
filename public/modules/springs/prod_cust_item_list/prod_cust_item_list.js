var app = angular.module('ebs2App');
app.controller('prod_cust_item_listCtrl', function ($scope, $http, $routeParams, $location) {

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
	$scope.inv_customer_springs={};
	$scope.inv_customer_springsList=[];
	var db_inv_customer_springs={};
	$scope.inv_customer_springsList=[];
	$scope.sales_so_springsList=[];
	$scope.inv_item_master_springsList=[];
	$scope.admin_currencyList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_so_springsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_customer_springsList=response.data[0];
				$scope.sales_so_springsList=response.data[1];
				$scope.inv_item_master_springsList=response.data[2];
				$scope.admin_currencyList=response.data[3];
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
			$scope.sales_so_springs['action'] = 'SELECT_INV_CUSTOMER_SPRINGS';
			db_sales_so_springs['trans'] = $scope.sales_so_springs;
			db_sales_so_springs['proc'] = 'inv_customer_order_springsOps';
			$http.post('/db_data',db_sales_so_springs).success(function(response){
			if (response.error!='None'){
				$scope.sales_so_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				console.log(response);
				$scope.sales_so_springsList = response.data[0];
				//$scope.sales_so_springs_detailsList = response.data[1];
				//$scope.inv_customer_springsList = response.data[2];
				}
		});
	};
	select_sales_so_springs_record();

	
})