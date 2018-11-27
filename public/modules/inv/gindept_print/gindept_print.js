var app = angular.module('ebs2App');
app.controller('gindept_printCtrl', function ($scope, $http, $routeParams, $location, $rootScope) {

	var hid = $routeParams.id;
	$scope.inv_mat_header={};
	$scope.inv_mat_headerList=[];
	var db_inv_mat_header={};

	var select_inv_mat_header_record = function() {
		if (hid != undefined)
			$scope.inv_mat_header['sysid'] = hid;
		$scope.inv_mat_header['action'] = 'SELECT_INV_MAT_HEADER';
		db_inv_mat_header['trans'] = $scope.inv_mat_header;
		db_inv_mat_header['proc'] = 'inv_mat_headerOps';
		$http.post('/db_data',db_inv_mat_header).success(function(response){
		console.log(response.data);
			if (response.error!='None'){
				$scope.inv_mat_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_mat_headerList = response.data[0];
				$scope.inv_mat_detailsList = response.data[1];
				if ($scope.inv_mat_headerList.length>0){
					$scope.inv_mat_header=response.data[0][0];
				}
		console.log($scope.inv_mat_detailsList);
				if ($scope.inv_mat_detailsList.length<5){
					for(var i=$scope.inv_mat_detailsList.length; i<7; i++){
						$scope.inv_mat_detailsList.push({sr_no: '', item_name: '', item_qty: '', item_uom: '', total_wt: '', wt_uom: ''});
					}
				}
				
			}
		});
	};
	select_inv_mat_header_record();

	$scope.doPrint = function(){
		window.print();
	}

})