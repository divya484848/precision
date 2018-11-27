var app = angular.module('ebs2App');
app.controller('gindept_listCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.inv_mat_header={};
	$scope.inv_mat_headerList=[];
	var db_inv_mat_header={};
	
	var select_inv_mat_header_record = function() {
		$scope.inv_mat_header['action'] = 'SELECT_INV_MAT_HEADER';
		db_inv_mat_header['trans'] = $scope.inv_mat_header;
		db_inv_mat_header['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_header).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_headerList = _.where(response.data[0],{supp_id: null, trans_type: 'Issue'});
			}
		});
	};
	select_inv_mat_header_record();

	$scope.cancel_id = 0;
	$scope.setCancelId = function(id){
		$scope.cancel_id = id;
	}

	$scope.cancel_challan = function(){
		$scope.inv_mat_header['action'] = 'CANCEL_CHALLAN';
		$scope.inv_mat_header['sysid'] = $scope.cancel_id;
		$scope.inv_mat_header['hdr_id'] = $scope.cancel_id;
		db_inv_mat_header['trans'] = $scope.inv_mat_header;
		db_inv_mat_header['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_header).success(function(response){
		console.log(response);
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_headerList = response.data[0];
				select_inv_mat_header_record();
			}
		});
	}
})