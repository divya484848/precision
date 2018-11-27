var app = angular.module('ebs2App');
app.controller('op_bal_fgCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.inv_op_bal_fg={};
	$scope.inv_op_bal_fgList=[];
	var db_inv_op_bal_fg={};
	$scope.inv_finished_goodsList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_op_bal_fgOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_finished_goodsList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_inv_op_bal_fg_record = function() {

		$scope.inv_op_bal_fg['action'] = 'SELECT_INV_OP_BAL_FG';
		db_inv_op_bal_fg['trans'] = $scope.inv_op_bal_fg;
		db_inv_op_bal_fg['proc'] = 'inv_op_bal_fgOps';
		$http.post('/db_data',db_inv_op_bal_fg).success(function(response){
			console.log(response);
			if (response.error!='None'){
				$scope.inv_op_bal_fg_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_op_bal_fgList = response.data[0];
				$scope.inv_op_bal_fg['action'] = 'INSERT_INV_OP_BAL_FG';
				console.log($scope.inv_op_bal_fg);
			}
		});
		
	};
	select_inv_op_bal_fg_record();

	$scope.save_inv_op_bal_fg_record = function() {
		db_inv_op_bal_fg['trans'] = $scope.inv_op_bal_fg;
		db_inv_op_bal_fg['proc'] = 'inv_op_bal_fgOps';
		if ($scope.inv_op_bal_fg['item_id']==undefined){
			$scope.inv_op_bal_fg_status = 'Item must be selected.';
			return;
		}
		if ($scope.inv_op_bal_fg['op_bal_date']==undefined){
			$scope.inv_op_bal_fg_status = 'Stock date should be mentioned.';
			return;
		}

		if ($scope.inv_op_bal_fg['item_qty'] == undefined && $scope.inv_op_bal_fg['item_wt']==undefined){
			$scope.inv_op_bal_fg_status = 'Either item qty or weight should be present.';
			return;
		}

		if(moment($scope.inv_op_bal_fg['op_bal_date'],'YYYY-MM-DD').isAfter(moment())){
			$scope.inv_op_bal_fg_status = 'Balance date can not be future date.';
			return;
		}
		console.log(db_inv_op_bal_fg);
		$http.post('/db_data',db_inv_op_bal_fg).success(function(response){
			if (response.error!='None'){
				$scope.inv_op_bal_fg_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_op_bal_fg_status = response.data[0][0].msg;
				$scope.inv_op_bal_fg = {};
				db_inv_op_bal_fg = {};
				select_inv_op_bal_fg_record();
				select_ref_record();
				$scope.inv_op_bal_fg['op_bal_date']= moment().format('YYYY-MM-DD');
			}
		});
	}

	$scope.delete_inv_op_bal_fg_record = function(sysid) {
		$scope.inv_op_bal_fg['sysid'] = sysid;
		$scope.inv_op_bal_fg['action'] = 'DELETE_INV_OP_BAL_FG';
		db_inv_op_bal_fg['trans'] = $scope.inv_op_bal_fg;
		db_inv_op_bal_fg['proc'] = 'inv_op_bal_fgOps';
		$http.post('/db_data',db_inv_op_bal_fg).success(function(response){
			if (response.error!='None'){
				$scope.inv_op_bal_fg_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_op_bal_fg_status = response.data[0][0].msg;
				$scope.inv_op_bal_fg = {};
				db_inv_op_bal_fg = {};
				select_inv_op_bal_fg_record();
			}
		});
	}

	$scope.insert_inv_op_bal_fg_record = function() {
		$scope.inv_op_bal_fg = {status: 'Active'}
		$scope.inv_op_bal_fg['action'] = 'INSERT_INV_OP_BAL_FG';
		$scope.inv_op_bal_fg_status = '';
	}

	$scope.update_inv_op_bal_fg_record = function(x) {
		$scope.inv_op_bal_fg = x;
		$scope.inv_op_bal_fg['action'] = 'UPDATE_INV_OP_BAL_FG';
		$scope.inv_op_bal_fg_status = '';
	}

	$scope.clearStatus = function(){
		$scope.inv_op_bal_fg_status = '';
	}

})