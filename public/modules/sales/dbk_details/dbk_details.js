var app = angular.module('ebs2App');
app.controller('dbk_detailsCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.sales_invoice={};
	$scope.sales_invoiceList=[];
	var db_sales_invoice={};
	
	$scope.select_sales_invoice_record = function() {
		$scope.sales_invoice['action'] = 'DBK_SELECT';
		db_sales_invoice['trans'] = $scope.sales_invoice;
		db_sales_invoice['proc'] = 'sales_invoiceOps';
		db_sales_invoice['report'] = {name: 'dbk'};
		$http.post('/db_data',db_sales_invoice).success(function(response){
			if (response.error!='None'){
				$scope.sales_invoice_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_invoiceList = response.data[0];
			}
		});
	};

	$scope.download_report = function(){
		$http.post('/excel_reports',$scope.sales_invoiceList).success(function(response){
			/*if (response.error!='None'){
				$scope.sales_invoice_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_invoiceList = response.data[0];
			}*/
		});
	}
})