var app = angular.module('ebs2App');
app.controller('prod_order_process_springs_listCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.prod_order_process_springs={};
	$scope.prod_order_process_springsList=[];
	var db_prod_order_process_springs={};
	$scope.sales_so_springsList=[];
	$scope.inv_item_master_springsList=[];
	
	var select_prod_order_process_springs_record = function() {
		$scope.prod_order_process_springs['action'] = 'SELECT_PROD_ORDER_PROCESS_SPRINGS';
		db_prod_order_process_springs['trans'] = $scope.prod_order_process_springs;
		db_prod_order_process_springs['proc'] = 'prod_order_process_springsOps';
		$http.post('/db_data',db_prod_order_process_springs).success(function(response){
			if (response.error!='None'){
				$scope.prod_order_process_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_order_process_springsList = response.data[0];
			}
		});
	};
	select_prod_order_process_springs_record();

	
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
				$scope.prod_order_process_springs = {};
				db_prod_order_process_springs = {};
				select_prod_order_process_springs_record();
			}
		});
	}
})