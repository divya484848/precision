var app = angular.module('ebs2App');
app.controller('loginCtrl', function ($scope, $http, $routeParams, $location, $rootScope) {

	var hid = $routeParams.id;
	$scope.admin_user_login = {};
	$scope.admin_user_loginList = [];
	var db_admin_user_login = {};
	
	// var app = angular.module['os'];

	$scope.auth_me = function() {
		// ax = new ActiveXObject("WScript.Network");
		// $scope.name = 'User: ' + ax.UserName + ' Computer: ' + ax.ComputerName;
		// console.log($scope.name);

		//console.log(ax);
	
		$scope.admin_user_login['action'] = 'AUTH';
		db_admin_user_login['trans'] = $scope.admin_user_login;
		db_admin_user_login['proc'] = 'admin_user_accountsOps';
		$http.post('/db_data',db_admin_user_login).success(function(response){
			if (response.error!='None'){
				$scope.admin_user_login_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				if (response.data[0][0]['msg'] == undefined){
					$rootScope.logged_user = response.data[0][0]['v_complete_name'];
					$rootScope.main_menu_list = response.data[1];
					$rootScope.sub_main_menu_list = response.data[2];
					$rootScope.sub_sub_main_menu_list = response.data[3];
					$rootScope.logged_user_details = response.data[4];
					$rootScope.show_menus = true;
					$location.url('/dashboard');
				}
				else{
					$scope.admin_user_login_status = response.data[0][0]['msg'];
				}
			}
		});
	};
})