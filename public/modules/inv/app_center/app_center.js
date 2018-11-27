var app = angular.module('ebs2App');
app.controller('app_centerCtrl', function ($scope, $http, $routeParams, $location) {
	$scope.inv_ledger_view={};
	$scope.inv_ledger_viewList=[];
	var db_inv_ledger_view={};
	
	$scope.select_inv_ledger_view_record = function() {
		$scope.inv_ledger_viewList = {};
		$scope.inv_ledger_view['action'] = 'LEDGER';
		db_inv_ledger_view['trans'] = $scope.inv_ledger_view;
		db_inv_ledger_view['proc'] = 'inv_ledger_viewOps';
		$http.post('/db_data',db_inv_ledger_view).success(function(response){
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_ledger_viewList = _.where(response.data[0],{status: 'Prepared'});
			}
		});
	};

	$scope.update_status_challan = function(sysid, status){
		$scope.inv_ledger_view['sysid'] = sysid;
		$scope.inv_ledger_view['status'] = status;
		$scope.inv_ledger_view['action'] = 'UPDATE_LEDGER';
		db_inv_ledger_view['trans'] = $scope.inv_ledger_view;
		db_inv_ledger_view['proc'] = 'inv_ledger_viewOps';
		$http.post('/db_data',db_inv_ledger_view).success(function(response){
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_ledger_view_status = response.data[0][0].msg;
				$scope.select_inv_ledger_view_record();
			}
		});
	}

	$scope.show_details = function(rec){
		$scope.inv_ledger_view = rec;
	}
})