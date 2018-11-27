var app = angular.module('ebs2App');
app.controller('hsn_reportCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.inv_finished_goods={};
	$scope.inv_finished_goodsList=[];
	var db_inv_finished_goods={};
	
	$scope.select_inv_finished_goods_record = function() {
		$scope.inv_finished_goods['action'] = 'HSN_REPORT';
		db_inv_finished_goods['trans'] = $scope.inv_finished_goods;
		db_inv_finished_goods['proc'] = 'sales_reportsOps';
		$http.post('/db_data',db_inv_finished_goods).success(function(response){
			if (response.error!='None'){
				$scope.inv_finished_goods_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				console.log(_.groupBy(response.data[0], function(value) { return value; }));
				$scope.inv_finished_goodsList = response.data[0];
			}
		});
	};
})