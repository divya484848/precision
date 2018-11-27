var app = angular.module('ebs2App');
app.controller('grndept_printCtrl', function ($scope, $http, $routeParams, $location) {
	var hid = $routeParams.id;
	$scope.inv_mat_header={};
	$scope.inv_mat_headerList=[];
	var db_inv_mat_header={};
	$scope.inv_mat_details={};
	$scope.inv_mat_detailsList=[];

	var select_inv_mat_header_record = function() {
		if (hid != undefined)
			$scope.inv_mat_header['sysid'] = hid;
		$scope.inv_mat_header['action'] = 'SELECT_INV_MAT_HEADER';
		db_inv_mat_header['trans'] = $scope.inv_mat_header;
		db_inv_mat_header['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_header).success(function(response){
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_headerList = response.data[0];
				$scope.inv_mat_detailsList = response.data[1];
				if ($scope.inv_mat_headerList.length>0){
					$scope.inv_mat_header=response.data[0][0];
				}			
				if ($scope.inv_mat_detailsList.length>0){
					$scope.inv_mat_details=response.data[1][0];
					$scope.inv_mat_details['total_qty'] = 
						($scope.inv_mat_details['rec_ok_qty']==undefined?0:parseFloat($scope.inv_mat_details['rec_ok_qty']))+
						($scope.inv_mat_details['rec_rej_qty']==undefined?0:parseFloat($scope.inv_mat_details['rec_rej_qty']))+
						($scope.inv_mat_details['rec_scrap_qty']==undefined?0:parseFloat($scope.inv_mat_details['rec_scrap_qty']))+
						($scope.inv_mat_details['rec_unused_qty']==undefined?0:parseFloat($scope.inv_mat_details['rec_unused_qty']))+
						($scope.inv_mat_details['loss_qty']==undefined?0:parseFloat($scope.inv_mat_details['loss_qty']));
					$scope.inv_mat_details['total_wt'] = 
						($scope.inv_mat_details['rec_ok_wt']==undefined?0:parseFloat($scope.inv_mat_details['rec_ok_wt']))+
						($scope.inv_mat_details['rec_rej_wt']==undefined?0:parseFloat($scope.inv_mat_details['rec_rej_wt']))+
						($scope.inv_mat_details['rec_scrap_wt']==undefined?0:parseFloat($scope.inv_mat_details['rec_scrap_wt']))+
						($scope.inv_mat_details['rec_unused_wt']==undefined?0:parseFloat($scope.inv_mat_details['rec_unused_wt']))+
						($scope.inv_mat_details['loss_wt']==undefined?0:parseFloat($scope.inv_mat_details['loss_wt']));
				}	
			}
		});
	};
	select_inv_mat_header_record();

	$scope.doPrint = function(){
		window.print();
	}
})