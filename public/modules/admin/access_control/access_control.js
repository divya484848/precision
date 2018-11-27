var app = angular.module('ebs2App');
app.controller('access_controlCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.admin_access_control={};
	$scope.admin_access_controlList=[];
	var db_admin_access_control={};
	$scope.admin_access_profileList=[];
	$scope.sys_menusList=[];
	$scope.main_menuList=[];
	$scope.sub_menuList=[];
	$scope.sub_sub_menuList=[];
	$scope.abc={};
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_access_controlOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_access_profileList=response.data[0];
				$scope.sys_menusList=response.data[1];
				
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	$scope.select_menu_record = function() {
		$scope.admin_access_control['action'] = 'SELECT_MENUS';
		db_admin_access_control['trans'] = $scope.admin_access_control;
		db_admin_access_control['proc'] = 'admin_access_controlOps';
		$http.post('/db_data',db_admin_access_control).success(function(response){
			if (response.error!='None'){
				$scope.admin_access_control_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_access_controlList = response.data[0];
				$scope.main_menuList=_.where(response.data[0],{menu_type: 0});
				$scope.sub_menuList=_.where(response.data[0],{menu_type: 1});
				$scope.sub_sub_menuList=_.where(response.data[0],{menu_type: 2});
			}
		});
	};

	$scope.toggle_choice_read = function(val){
		console.log(val);
		if (val=="No")
			$scope.admin_access_control['access_read']=1;
		else
			$scope.admin_access_control['access_read']=0;
	}

	var select_admin_access_control_record = function() {
		$scope.admin_access_control['action'] = 'SELECT_ADMIN_ACCESS_CONTROL';
		db_admin_access_control['trans'] = $scope.admin_access_control;
		db_admin_access_control['proc'] = 'admin_access_controlOps';
		$http.post('/db_data',db_admin_access_control).success(function(response){
			if (response.error!='None'){
				$scope.admin_access_control_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_access_controlList = response.data[0];
				if (hid != undefined){
					$scope.admin_access_control=response.data[0][0];
					$scope.admin_access_control['action'] = 'UPDATE_ADMIN_ACCESS_CONTROL';
				}
				else {
					$scope.admin_access_control['action'] = 'INSERT_ADMIN_ACCESS_CONTROL';
				}
			}
		});
	};
	//select_admin_access_control_record();

	$scope.exists = function(rec){
		console.log(rec);
		console.log($scope.admin_access_controlList.indexOf(rec));
	}

	$scope.save_admin_access_control_record = function(rec) {
		$scope.admin_access_control = rec;
		console.log(rec);
		console.log($scope.abc);
		/*db_admin_access_control['trans'] = $scope.admin_access_control;
		db_admin_access_control['proc'] = 'admin_access_controlOps';
		$http.post('/db_data',db_admin_access_control).success(function(response){
			if (response.error!='None'){
				$scope.admin_access_control_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_access_control_status = response.data[0][0].msg;
				$scope.admin_access_control = {};
				db_admin_access_control = {};
				select_admin_access_control_record();
			}
		});*/
	}

	$scope.delete_admin_access_control_record = function(sysid) {
		$scope.admin_access_control['sysid'] = sysid;
		$scope.admin_access_control['action'] = 'DELETE_ADMIN_ACCESS_CONTROL';
		db_admin_access_control['trans'] = $scope.admin_access_control;
		db_admin_access_control['proc'] = 'admin_access_controlOps';
		$http.post('/db_data',db_admin_access_control).success(function(response){
			if (response.error!='None'){
				$scope.admin_access_control_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_access_control_status = response.data[0][0].msg;
				$scope.admin_access_control = {};
				db_admin_access_control = {};
				select_admin_access_control_record();
			}
		});
	}

	$scope.insert_admin_access_control_record = function() {
		$scope.admin_access_control = {status: 'Active'}
		$scope.admin_access_control['action'] = 'INSERT_ADMIN_ACCESS_CONTROL';
		hid = undefined;
		$scope.admin_access_control_status = '';
	}

	$scope.update_admin_access_control_record = function(x) {
		$scope.admin_access_control = x;
		$scope.admin_access_control['action'] = 'UPDATE_ADMIN_ACCESS_CONTROL';
		hid = x['sysid'];
		$scope.admin_access_control_status = '';
	}

})