var app = angular.module('ebs2App');
app.controller('tax_invoice_listCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.sales_invoice={};
	$scope.sales_invoiceList=[];
	var db_sales_invoice={};
	$scope.inv_customerList=[];
	$scope.sales_payment_termsList=[];
	$scope.admin_currencyList=[];
	$scope.sales_dom_portsList=[];
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

	var select_sales_invoice_record = function() {
		if (hid != undefined)
			$scope.sales_invoice['sysid'] = hid;
		$scope.sales_invoice['action'] = 'SELECT_SALES_INVOICE';
		db_sales_invoice['trans'] = $scope.sales_invoice;
		db_sales_invoice['proc'] = 'sales_invoiceOps';
		$http.post('/db_data',db_sales_invoice).success(function(response){
			if (response.error!='None'){
				$scope.sales_invoice_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_invoiceList = response.data[0];
			}
		});
	};
	select_sales_invoice_record();

	$scope.delete_sales_invoice_record = function(sysid) {
		$scope.sales_invoice['sysid'] = sysid;
		$scope.sales_invoice['action'] = 'DELETE_SALES_INVOICE';
		db_sales_invoice['trans'] = $scope.sales_invoice;
		db_sales_invoice['proc'] = 'sales_invoiceOps';
		$http.post('/db_data',db_sales_invoice).success(function(response){
			if (response.error!='None'){
				$scope.sales_invoice_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.sales_invoice_status = response.data[0][0].msg;
				$scope.sales_invoice = {};
				db_sales_invoice = {};
				select_sales_invoice_record();
			}
		});
	}
})