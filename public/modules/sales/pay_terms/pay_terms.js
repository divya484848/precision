var app = angular.module('ebs2App');
app.controller('pay_termsCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.sales_payment_terms={};
	$scope.sales_payment_termsList=[];
	var db_sales_payment_terms={};
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_payment_termsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_sales_payment_terms_record = function() {
		if (hid != undefined)
			$scope.sales_payment_terms['sysid'] = hid;
		$scope.sales_payment_terms['action'] = 'SELECT_SALES_PAYMENT_TERMS';
		db_sales_payment_terms['trans'] = $scope.sales_payment_terms;
		db_sales_payment_terms['proc'] = 'sales_payment_termsOps';
		$http.post('/db_data',db_sales_payment_terms).success(function(response){
			if (response.error!='None'){
				$scope.sales_payment_terms_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_payment_termsList = response.data[0];
				if (hid != undefined){
					$scope.sales_payment_terms=response.data[0][0];
					$scope.sales_payment_terms['action'] = 'UPDATE_SALES_PAYMENT_TERMS';
				}
				else {
					$scope.sales_payment_terms['action'] = 'INSERT_SALES_PAYMENT_TERMS';
				}
			}
		});
	};
	select_sales_payment_terms_record();

	$scope.save_sales_payment_terms_record = function() {
		db_sales_payment_terms['trans'] = $scope.sales_payment_terms;
		db_sales_payment_terms['proc'] = 'sales_payment_termsOps';
		$http.post('/db_data',db_sales_payment_terms).success(function(response){
			if (response.error!='None'){
				$scope.sales_payment_terms_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_payment_terms_status = response.data[0][0].msg;
				$scope.sales_payment_terms = {};
				db_sales_payment_terms = {};
				hid = undefined;
				select_sales_payment_terms_record();
			}
		});
	}

	$scope.delete_sales_payment_terms_record = function(sysid) {
		$scope.sales_payment_terms['sysid'] = sysid;
		$scope.sales_payment_terms['action'] = 'DELETE_SALES_PAYMENT_TERMS';
		db_sales_payment_terms['trans'] = $scope.sales_payment_terms;
		db_sales_payment_terms['proc'] = 'sales_payment_termsOps';
		$http.post('/db_data',db_sales_payment_terms).success(function(response){
			if (response.error!='None'){
				$scope.sales_payment_terms_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.sales_payment_terms_status = response.data[0][0].msg;
				$scope.sales_payment_terms = {};
				db_sales_payment_terms = {};
				select_sales_payment_terms_record();
			}
		});
	}

	$scope.insert_sales_payment_terms_record = function() {
		$scope.sales_payment_terms = {status: 'Active'}
		$scope.sales_payment_terms['action'] = 'INSERT_SALES_PAYMENT_TERMS';
		hid = undefined;
		$scope.sales_payment_terms_status = '';
	}

	$scope.update_sales_payment_terms_record = function(x) {
		$scope.sales_payment_terms = x;
		$scope.sales_payment_terms['action'] = 'UPDATE_SALES_PAYMENT_TERMS';
		hid = x['sysid'];
		$scope.sales_payment_terms_status = '';
	}

})