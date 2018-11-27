var app = angular.module('ebs2App');
app.controller('gindeptrepCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.deptList = [];
	$scope.empList = [];
	$scope.itemList = [];
	var db_input={};

	var select_inputs = function(){
		db_input['trans'] = {rep_type: 'DEPT_INPUT'};
		db_input['proc'] = 'mat_report';
		$http.post('/db_data',db_input).success(function(response){
			$scope.deptList = response.data[0];
			$scope.empList = response.data[1];
			$scope.itemList = response.data[2];
		});
	}
	select_inputs();

    var rep_inp = {};
    var db_rep_inp = {};
    $scope.gindeptList = [];
	$scope.select_report_data = function(){
		rep_inp['from_date'] = $scope.from_date;
        rep_inp['to_date'] = $scope.to_date;
		rep_inp['sys_emp_id'] = $scope.emp_id;
		rep_inp['sys_dept_id'] = $scope.dept_id;
		rep_inp['item_id'] = $scope.item_id;
        rep_inp['rep_type'] = 'GIN_DEPT';
		db_rep_inp['trans'] = rep_inp;
		db_rep_inp['proc'] = 'mat_report';
		$http.post('/db_data',db_rep_inp).success(function(response){
			console.log(response.data[0]);
			if (response.error=='None'){
				$scope.gindeptList = response.data[0];
				if ($scope.dept_id != undefined)
					$scope.gindeptList = _.where($scope.gindeptList,{'dept_id': $scope.dept_id});
				if ($scope.emp_id != undefined)
					$scope.gindeptList = _.where($scope.gindeptList,{'party_id': $scope.emp_id})
				if ($scope.item_id != undefined)
					$scope.gindeptList = _.where($scope.gindeptList,{'item_id': $scope.item_id})
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	}

	$scope.filterDeptEmp = function(v_dept_id){
		console.log(v_dept_id);
		$scope.empList = _.where($scope.empList,{dept_id: v_dept_id});
	}

	$scope.refresh_form = function(){
		$scope.supp_id = null;
		$scope.from_date = null;
		$scope.to_date = null;
	}

	$scope.exportExcel = function(){
		var blob = new Blob([document.getElementById('exportable').innerHTML], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		var dt = new Date();
		var ename = "GIN_VENDOR_"+dt.getDate()+dt.getMonth()+dt.getFullYear()+dt.getHours()+dt.getMinutes()+dt.getSeconds()+".xls";
		saveAs(blob, ename);
	}
});