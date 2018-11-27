var app = angular.module('ebs2App');
app.controller('dbk_updateCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.sales_invoice={};
	$scope.sales_invoiceList=[];
	var db_sales_invoice={};
	$scope.inv_customerList=[];
	$scope.sales_payment_termsList=[];
	$scope.admin_currencyList=[];
	$scope.sales_dom_portsList=[];
	$scope.date_range={
		from_date: moment().format('YYYY-MM-DD'),
		to_date: moment().format('YYYY-MM-DD')
	};
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_invoiceOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_customerList=response.data[0];
				$scope.sales_payment_termsList=response.data[1];
				$scope.admin_currencyList=response.data[2];
				$scope.sales_dom_portsList=response.data[3];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	$scope.select_sales_invoice_record = function() {
		$scope.sales_invoice['from_date'] = $scope.date_range['from_date'];
		$scope.sales_invoice['to_date'] = $scope.date_range['to_date'];
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
				$scope.sales_invoice['action'] = 'DBK_UPDATE';
			}
		});
	};
	
	$scope.save_sales_invoice_record = function() {
		db_sales_invoice['trans'] = $scope.sales_invoice;
		db_sales_invoice['proc'] = 'sales_invoiceOps';
		$http.post('/db_data',db_sales_invoice).success(function(response){
			if (response.error!='None'){
				$scope.sales_invoice_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_invoice_status = response.data[0][0].msg;
				$scope.select_sales_invoice_record();
			}
		});
	}

	$scope.update_sales_invoice_record = function(x) {
		$scope.sales_invoice = x;
		$scope.sales_invoice['action'] = 'DBK_UPDATE';
		$scope.sales_invoice_status = '';
	}

	$scope.update_inr_value = function(){
		$scope.sales_invoice['inr_final_amount']=$scope.sales_invoice['final_total_inv_amt']*$scope.sales_invoice['exchange_rate'];
	}

})