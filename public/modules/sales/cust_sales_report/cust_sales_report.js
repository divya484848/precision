var app = angular.module('ebs2App');
app.controller('cust_sales_reportCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.sales_invoice={};
	$scope.sales_invoiceList=[];
	var db_sales_invoice={};
	$scope.inv_customerList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_invoiceOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_customerList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	$scope.select_sales_invoice_record = function() {
		$scope.sales_invoice['action'] = 'CUST_SALES_REPORT';
		db_sales_invoice['trans'] = $scope.sales_invoice;
		db_sales_invoice['proc'] = 'sales_reportsOps';
		$http.post('/db_data',db_sales_invoice).success(function(response){
			if (response.error!='None'){
				$scope.sales_invoice_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_invoiceList = _.where(response.data[0],{cust_id: $scope.sales_invoice['cust_id']});
			}
		});
	};
})