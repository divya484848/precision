var app = angular.module('ebs2App');
app.controller('prod_item_details_springsCtrl', function ($scope, $http, $routeParams, $location) {
	var hid = $routeParams.id;
	$scope.inv_item_header={};
	$scope.inv_item_headerList=[];
	var db_inv_item_header={};
	$scope.inv_item_details={};
	$scope.inv_item_attribList=[];
	$scope.inv_item_heatList=[];
	$scope.inv_item_loadList=[];

	var select_inv_item_header_record = function() {
         console.log(hid);
		if (hid != undefined)
			$scope.inv_item_header['sysid'] = hid;
		$scope.inv_item_header['action'] = 'SELECT_INV_CUSTOMER_SPRINGS';
		db_inv_item_header['trans'] = $scope.inv_item_header;
		db_inv_item_header['proc'] = 'inv_customer_order_springsOps';
		$scope.inv_item_header = '';
		$http.post('/db_data',db_inv_item_header).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_header_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				console.log(response);
				$scope.inv_item_headerList = response.data[0];
				$scope.inv_item_header= response.data[0][0]; 
				console.log($scope.inv_item_header);
				$scope.inv_item_attribList = response.data[1];
				$scope.inv_item_heatList = response.data[2];
				$scope.inv_item_loadList = response.data[3];
				
				
			}	
		});
	};
	select_inv_item_header_record();

	$scope.doPrint = function(){
		window.print();
	}
})

