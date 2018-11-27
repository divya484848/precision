var app = angular.module('ebs2App');
app.controller('deptCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	$scope.admin_dept={};
	$scope.admin_deptList=[];
	var db_admin_dept={};
	$scope.admin_companyList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_deptOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_companyList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_admin_dept_record = function() {
		if (hid != undefined)
			$scope.admin_dept['sysid'] = hid;
		$scope.admin_dept['action'] = 'SELECT_ADMIN_DEPT';
		db_admin_dept['trans'] = $scope.admin_dept;
		db_admin_dept['proc'] = 'admin_deptOps';
		$http.post('/db_data',db_admin_dept).success(function(response){
			if (response.error!='None'){
				$scope.admin_dept_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_deptList = response.data[0];
				if (hid != undefined)
					$scope.admin_dept=response.data[0][0];
				$scope.admin_dept['action'] = 'INSERT_ADMIN_DEPT';
			}
		});
	};
	select_admin_dept_record();

	$scope.save_admin_dept_record = function() {
		db_admin_dept['trans'] = $scope.admin_dept;
		db_admin_dept['proc'] = 'admin_deptOps';
		$http.post('/db_data',db_admin_dept).success(function(response){
			if (response.error!='None'){
				$scope.admin_dept_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_dept_status = response.data[0][0].msg;
				$scope.admin_dept = {};
				db_admin_dept = {};
				hid = undefined;
				select_admin_dept_record();
			}
		});
	}

	$scope.delete_admin_dept_record = function(sysid) {
		$scope.admin_dept['sysid'] = sysid;
		$scope.admin_dept['action'] = 'DELETE_ADMIN_DEPT';
		db_admin_dept['trans'] = $scope.admin_dept;
		db_admin_dept['proc'] = 'admin_deptOps';
		$http.post('/db_data',db_admin_dept).success(function(response){
			if (response.error!='None'){
				$scope.admin_dept_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_dept_status = response.data[0][0].msg;
				$scope.admin_dept = {};
				db_admin_dept = {};
				select_admin_dept_record();
			}
		});
	}

	$scope.insert_admin_dept_record = function() {
		$scope.admin_dept['action'] = 'INSERT_ADMIN_DEPT';
		$scope.admin_dept = {status: 'Active'}
		hid = undefined;
		$scope.admin_dept_status = '';
	}

	$scope.update_admin_dept_record = function(x) {
		$scope.admin_dept = x;
		$scope.admin_dept['action'] = 'UPDATE_ADMIN_DEPT';
		hid = x['sysid'];
		$scope.admin_dept_status = '';
	}

})