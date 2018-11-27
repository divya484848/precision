var app = angular.module('ebs2App');
app.controller('sales_compareCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.sales_invoice={};
	$scope.sales_invoiceList=[];
	var db_sales_invoice={};
	$scope.inv_customerList=[];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'sales_invoiceOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.inv_customerList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var drawChart = function() {
      var data = google.visualization.arrayToDataTable($scope.sales_invoiceList);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: "Sales comparision",
		subtitle: "Your sales projection till ",
        width: 1200,
        height: 500,
        bar: {groupWidth: "95%"},
        legend: { position: "none" },
		vAxis: {
          title: 'Amount in $'
        },
		hAxis: {
          title: 'Month-year'
        }
      };
      var chart = new google.visualization.ColumnChart(document.getElementById("sales"));
      chart.draw(view, options);
  	}

	$scope.select_sales_invoice_record = function() {
		$scope.sales_invoice['action'] = 'SALES_COMP1';
		db_sales_invoice['trans'] = $scope.sales_invoice;
		db_sales_invoice['proc'] = 'sales_reportsOps';
		$http.post('/db_data',db_sales_invoice).success(function(response){
			if (response.error!='None'){
				$scope.sales_invoice_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.sales_invoiceList=[];
				var cust_data = _.where(response.data[0],{cust_id: $scope.sales_invoice['cust_id']});
				var a = moment($scope.sales_invoice['from_date'],'YYYY-MM');
				var b = moment($scope.sales_invoice['to_date'],'YYYY-MM');
				var c = b.diff(a,'months');
				var found = [];
				$scope.sales_invoiceList[0]=['Month','Sale amount',{ role: "style" }];
				for(var i=1; i<=parseInt(c); i++){
					var temp_date = a.add(1,'month').format('YYYY-MM');
					found = _.where(cust_data,{inv_date: temp_date});
					if (found.length > 0){
						$scope.sales_invoiceList[i] = [temp_date, parseFloat(found[0]['total_amount']),"gold"];
					}
					else{
						$scope.sales_invoiceList[i] = [temp_date, 0,"silver"];
					}
				}
				console.log($scope.sales_invoiceList);
				google.charts.setOnLoadCallback(drawChart());	
			}
		});
	};

    
    
})