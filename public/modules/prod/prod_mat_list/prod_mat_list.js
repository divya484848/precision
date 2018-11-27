var app = angular.module('ebs2App');
app.controller('prod_mat_listCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.prod_product_assembly={};
	$scope.prod_product_assemblyList=[];
	var db_prod_product_assembly={};
	
	var select_prod_product_assembly_record = function() {
		$scope.prod_product_assembly['action'] = 'SELECT_PROD_PRODUCT_ASSEMBLY';
		db_prod_product_assembly['trans'] = $scope.prod_product_assembly;
		db_prod_product_assembly['proc'] = 'prod_product_assemblyOps';
		$http.post('/db_data',db_prod_product_assembly).success(function(response){
			if (response.error!='None'){
				$scope.prod_product_assembly_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.prod_product_assemblyList = response.data[0];
			}
		});
	};
	select_prod_product_assembly_record();

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
})