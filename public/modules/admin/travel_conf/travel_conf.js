var app = angular.module('ebs2App');
app.controller('travel_confCtrl', function ($scope, $http, $routeParams, $location) {

	$scope.admin_travel_country={};
	$scope.admin_travel_countryList=[];
	var db_admin_travel_country={};
	$scope.admin_travel_city={};
	$scope.admin_travel_cityList=[];
	var db_admin_travel_city={};
	$scope.admin_travel_exp_heads={};
	$scope.admin_travel_exp_headsList=[];
	var db_admin_travel_exp_heads={};
	$scope.admin_travel_type={};
	$scope.admin_travel_typeList=[];
	var db_admin_travel_type={};
	$scope.admin_currencyList=[];
	$scope.statusList=['Active','Inactive'];
	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'admin_travel_countryOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				$scope.admin_currencyList=response.data[0];
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
		});
	};
	select_ref_record();

	var select_admin_travel_country_record = function() {
		$scope.admin_travel_country['action'] = 'SELECT_ADMIN_TRAVEL_COUNTRY';
		db_admin_travel_country['trans'] = $scope.admin_travel_country;
		db_admin_travel_country['proc'] = 'admin_travel_countryOps';
		$http.post('/db_data',db_admin_travel_country).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_country_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			console.log(response.data);
				$scope.admin_travel_countryList = response.data[0];
				$scope.admin_travel_country['action'] = 'INSERT_ADMIN_TRAVEL_COUNTRY';
			}
		});
	};
	select_admin_travel_country_record();

	$scope.save_admin_travel_country_record = function() {
		db_admin_travel_country['trans'] = $scope.admin_travel_country;
		db_admin_travel_country['proc'] = 'admin_travel_countryOps';
		$http.post('/db_data',db_admin_travel_country).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_country_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_travel_country_status = response.data[0][0].msg;
				$scope.admin_travel_country = {};
				db_admin_travel_country = {};
				select_admin_travel_country_record();
			}
		});
	}

	$scope.delete_admin_travel_country_record = function(sysid) {
		$scope.admin_travel_country['sysid'] = sysid;
		$scope.admin_travel_country['action'] = 'DELETE_ADMIN_TRAVEL_COUNTRY';
		db_admin_travel_country['trans'] = $scope.admin_travel_country;
		db_admin_travel_country['proc'] = 'admin_travel_countryOps';
		$http.post('/db_data',db_admin_travel_country).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_country_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_travel_country_status = response.data[0][0].msg;
				$scope.admin_travel_country = {};
				db_admin_travel_country = {};
				select_admin_travel_country_record();
			}
		});
	}

	$scope.insert_admin_travel_country_record = function() {
		$scope.admin_travel_country = {status: 'Active'}
		$scope.admin_travel_country['action'] = 'INSERT_ADMIN_TRAVEL_COUNTRY';
		$scope.admin_travel_country_status = '';
	}

	$scope.update_admin_travel_country_record = function(x) {
		$scope.admin_travel_country = x;
		$scope.admin_travel_country['action'] = 'UPDATE_ADMIN_TRAVEL_COUNTRY';
		$scope.admin_travel_country_status = '';
	}


	var select_admin_travel_city_record = function() {
		$scope.admin_travel_city['country_id'] = $scope.trans_id;
		$scope.admin_travel_city['action'] = 'SELECT_ADMIN_TRAVEL_CITY';
		db_admin_travel_city['trans'] = $scope.admin_travel_city;
		db_admin_travel_city['proc'] = 'admin_travel_cityOps';
		$http.post('/db_data',db_admin_travel_city).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_city_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_travel_cityList = response.data[0];
			}
		});
	};
	select_admin_travel_city_record();

	$scope.save_admin_travel_city_record = function() {
		db_admin_travel_city['trans'] = $scope.admin_travel_city;
		db_admin_travel_city['proc'] = 'admin_travel_cityOps';
		$http.post('/db_data',db_admin_travel_city).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_city_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.admin_travel_city_status = response.data[0][0].msg;
				$scope.admin_travel_city = {};
				db_admin_travel_city = {};
				select_admin_travel_city_record();
			}
		});
	}

	$scope.delete_admin_travel_city_record = function(sysid) {
		$scope.admin_travel_city['sysid'] = sysid;
		$scope.admin_travel_city['action'] = 'DELETE_ADMIN_TRAVEL_CITY';
		db_admin_travel_city['trans'] = $scope.admin_travel_city;
		db_admin_travel_city['proc'] = 'admin_travel_cityOps';
		$http.post('/db_data',db_admin_travel_city).success(function(response){
			if (response.error!='None'){
				$scope.admin_travel_city_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.admin_travel_city_status = response.data[0][0].msg;
				$scope.admin_travel_city = {};
				db_admin_travel_city = {};
				select_admin_travel_city_record();
			}
		});
	}

	$scope.insert_admin_travel_city_record = function() {
		$scope.admin_travel_city = {status: 'Active'}
		$scope.admin_travel_city['action'] = 'INSERT_ADMIN_TRAVEL_CITY';
		$scope.admin_travel_city_status = '';
	}

	$scope.update_admin_travel_city_record = function(x) {
		$scope.admin_travel_city = x;
		$scope.admin_travel_city['action'] = 'UPDATE_ADMIN_TRAVEL_CITY';
		$scope.admin_travel_city_status = '';
	}

})