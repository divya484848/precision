var app = angular.module('ebs2App');
app.controller('polish_report_issueCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.inv_ledger_view={};
	$scope.inv_ledger_viewList=[];
	var db_inv_ledger_view={};
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_ledger_viewOps'};

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

	$scope.select_inv_ledger_view_record = function() {
		if (hid != undefined)
			$scope.inv_ledger_view['sysid'] = hid;
		$scope.inv_ledger_view['rep_type'] = 'POLISH';
		db_inv_ledger_view['trans'] = $scope.inv_ledger_view;
		db_inv_ledger_view['proc'] = 'stores_report';
		db_inv_ledger_view['report'] = {name: 'polish'};
		$http.post('/db_data',db_inv_ledger_view).success(function(response){
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_ledger_viewList = response.data[0];
			}
		});
	};
	//select_inv_ledger_view_record();

	$scope.save_inv_ledger_view_record = function() {
		db_inv_ledger_view['trans'] = $scope.inv_ledger_view;
		db_inv_ledger_view['proc'] = 'inv_ledger_viewOps';
		$http.post('/db_data',db_inv_ledger_view).success(function(response){
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_ledger_view_status = response.data[0][0].msg;
				$scope.inv_ledger_view = {};
				db_inv_ledger_view = {};
				hid = undefined;
				select_inv_ledger_view_record();
			}
		});
	}

	$scope.delete_inv_ledger_view_record = function(sysid) {
		$scope.inv_ledger_view['sysid'] = sysid;
		$scope.inv_ledger_view['action'] = 'DELETE_INV_LEDGER_VIEW';
		db_inv_ledger_view['trans'] = $scope.inv_ledger_view;
		db_inv_ledger_view['proc'] = 'inv_ledger_viewOps';
		$http.post('/db_data',db_inv_ledger_view).success(function(response){
			if (response.error!='None'){
				$scope.inv_ledger_view_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_ledger_view_status = response.data[0][0].msg;
				$scope.inv_ledger_view = {};
				db_inv_ledger_view = {};
				select_inv_ledger_view_record();
			}
		});
	}

	$scope.insert_inv_ledger_view_record = function() {
		$scope.inv_ledger_view = {status: 'Active'}
		$scope.inv_ledger_view['action'] = 'INSERT_INV_LEDGER_VIEW';
		hid = undefined;
		$scope.inv_ledger_view_status = '';
	}

	$scope.update_inv_ledger_view_record = function(x) {
		$scope.inv_ledger_view = x;
		$scope.inv_ledger_view['action'] = 'UPDATE_INV_LEDGER_VIEW';
		hid = x['sysid'];
		$scope.inv_ledger_view_status = '';
	}

})