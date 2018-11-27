var app = angular.module('ebs2App');
app.controller('diecast_ledgerCtrl', function ($scope, $http, $routeParams, $location) {
	$scope.inv_ledger_view={};
	$scope.inv_ledger_viewList=[];
	var db_inv_ledger_view={};
	
	$scope.select_inv_ledger_view_record = function() {
		$scope.inv_ledger_view['action'] = 'DIECAST';
		db_inv_ledger_view['trans'] = $scope.inv_ledger_view;
		db_inv_ledger_view['proc'] = 'inv_ledger_viewOps';
		db_inv_ledger_view['report'] = {name: 'diecast'};
		$http.post('/db_data',db_inv_ledger_view).success(function(response){
	console.log(response);
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_ledger_viewList = response.data[0];
			}
		});
	};
})