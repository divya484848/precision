var app = angular.module('ebs2App');
app.controller('item_master_springsCtrl', function ($scope, $http, $routeParams, $location) {

	var hid = $routeParams.id;
	$scope.trans_id = 0;
	if (hid!=undefined)
		$scope.trans_id = hid;
	var db_inv_item_heating ={};
	var db_inv_item_heating1 = {};
	var db_inv_item_load_test ={};
	var db_inv_item_load_test1 ={};
	var db_inv_item_master_springs={};
	var db_inv_item_attribs_springs_master ={};
	var db_inv_item_attribs_springs_master1 ={};
	$scope.inv_item_master_springs={};
    $scope.inv_item_master_springsList=[];
	$scope.inv_item_attribs_springs_master ={};
	$scope.inv_item_attribs_springs_master1 ={};
	$scope.inv_item_load_test={};
	$scope.inv_item_load_test1={};
	var inv_item_attribs_springs_master={};
	var inv_item_attribs_springs_masterList=[];
	var inv_item_attribs_springs_master1List=[];
	$scope.inv_item_heating={};
	var inv_item_heatingList=[];
	$scope.inv_item_heating1={};
	$scope.inv_item_heating1List=[];
	var inv_item_load_test={};
	var inv_item_load_testList=[];
	var admin_lovList=[];
	
	$scope.statusList=['Active','Inactive'];
	$scope.processNameList=['Machine','Hardening','Cleaning','Others'];
	$scope.processTimeList=['After','Before'];
	$scope.attrSatusList=['Active','Inactive'];
	$scope.furnanceNameList=['FurnaceA','FurnaceB'];
	$scope.temperatureUOMList=['C','F'];
	$scope.heatingTimeList=['Minutes','Hours','Seconds'];
	$scope.loadUOMList=['Kg','g','mg'];
	$scope.loadTimeUOMList=['Minutes','Hours','Seconds'];
	$scope.lengthUOMList=['mm','cm','m'];

	var db_ref = {trans: {action: 'REF_SELECT'}, proc: 'inv_item_master_springsOps'};

	var select_ref_record = function() {
		$http.post('/db_data',db_ref).success(function(response){
			if (response.error=='None'){
				 console.log(response);	
				$scope.admin_lovList=response.data[0];
				$scope.inv_item_master_springsList = response.data[1];
				$scope.inv_attribs_springs_masterList = response.data[2];
				//$scope.inv_item_heatingList = response.data[3];
				$scope.inv_item_load_testList = response.data[4];
				
			}
			else{
				$scope.status = response.error['sqlMessage'].substring(0,99);
			}
			console.log($scope.inv_attribs_springs_masterList);
		});
	};
	select_ref_record();

	var select_inv_item_master_springs_record = function() {
		if (hid != undefined)
			{
			$scope.inv_item_master_springs['sysid'] = hid;
			$scope.inv_item_attribs_springs_master['item_id'] = hid;
			$scope.inv_item_attribs_springs_master1['item_id'] = hid;
			$scope.inv_item_heating['item_id'] = hid;
			$scope.inv_item_heating1['item_id'] = hid;
			$scope.inv_item_load_test['item_id'] = hid;
			$scope.inv_item_load_test1['item_id']=hid;
			}
		$scope.inv_item_master_springs['action'] = 'SELECT_INV_ITEM_MASTER_SPRINGS';
		db_inv_item_master_springs['trans'] = $scope.inv_item_master_springs;
		db_inv_item_master_springs['proc'] = 'inv_item_master_springsOps';
		$http.post('/db_data',db_inv_item_master_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_master_springsList = response.data[0];
				$scope.inv_item_master_springs_status ='';
				
				if (hid != undefined){
					$scope.inv_item_master_springs=response.data[0][0];
					}
				
			}
			select_inv_item_attribs_springs_master_record();
			select_inv_item_heating_record();
			select_inv_item_load_test_record();
		});
	};
	select_inv_item_master_springs_record();

	$scope.save_inv_item_master_springs_record = function() {
		console.log($scope.inv_item_master_springs);
		if (hid != undefined){
					$scope.inv_item_master_springs['action'] = 'UPDATE_INV_ITEM_MASTER_SPRINGS';
				}
				else {
					$scope.inv_item_master_springs['action'] = 'INSERT_INV_ITEM_MASTER_SPRINGS';
					 }
		db_inv_item_master_springs['trans'] = $scope.inv_item_master_springs;
		db_inv_item_master_springs['proc'] = 'inv_item_master_springsOps';
		$http.post('/db_data',db_inv_item_master_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_master_springs_status = response.data[0][0].msg;
				if ($scope.inv_item_master_springs['action'] == 'INSERT_INV_ITEM_MASTER_SPRINGS')
				{
					$scope.trans_id = response.data[1][0].trans_id;
					$scope.inv_item_attribs_springs_master['item_id'] = $scope.trans_id ;
					$scope.inv_item_attribs_springs_master1['item_id'] = $scope.trans_id ;
					$scope.inv_item_heating['item_id'] =  $scope.trans_id;
					$scope.inv_item_heating1['item_id'] =  $scope.trans_id;	
					$scope.inv_item_load_test['item_id'] = $scope.trans_id;
					$scope.inv_item_load_test1['item_id'] = $scope.trans_id;
				}
				else
				{	$scope.trans_id = hid;
					$scope.inv_item_attribs_springs_master['item_id'] = $scope.trans_id ;
					$scope.inv_item_attribs_springs_master1['item_id'] = $scope.trans_id ;	
					$scope.inv_item_heating['item_id'] =  $scope.trans_id;
					$scope.inv_item_heating1['item_id'] =  $scope.trans_id;	
					$scope.inv_item_load_test['item_id'] = $scope.trans_id;
					$scope.inv_item_load_test1['item_id'] = $scope.trans_id;
				}
				
				$scope.inv_item_attribs_springs_master['short_code']= $scope.inv_item_master_springs['short_code'];
				//$scope.inv_item_master_springs = {};
				//db_inv_item_master_springs = {};
				//hid = undefined;
				select_inv_item_master_springs_record();
			}
		});
	}

	$scope.delete_inv_item_master_springs_record = function(sysid) {
		$scope.inv_item_master_springs['sysid'] = sysid;
		$scope.inv_item_master_springs['action'] = 'DELETE_INV_ITEM_MASTER_SPRINGS';
		db_inv_item_master_springs['trans'] = $scope.inv_item_master_springs;
		db_inv_item_master_springs['proc'] = 'inv_item_master_springsOps';
		$http.post('/db_data',db_inv_item_master_springs).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_master_springs_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_master_springs_status = response.data[0][0].msg;
				$scope.inv_item_master_springs = {};
				db_inv_item_master_springs = {};
				select_inv_item_master_springs_record();
			}
		});
	}

	$scope.insert_inv_item_master_springs_record = function() {
		$scope.inv_item_master_springs = {status: 'Active'}
		$scope.inv_item_master_springs['action'] = 'INSERT_INV_ITEM_MASTER_SPRINGS';
		//hid = undefined;
		//$scope.inv_item_master_springs_status = '';
	}

	$scope.update_inv_item_master_springs_record = function(x) {
		$scope.inv_item_master_springs = x;
		$scope.inv_item_master_springs_status = '';
		$scope.inv_item_master_springs['action'] = 'UPDATE_INV_ITEM_MASTER_SPRINGS';
		hid = x['sysid'];
		//$scope.inv_item_master_springs_status = '';
	}

	var select_inv_item_attribs_springs_master_record = function() {
		//if (hid != undefined)
		//	$scope.inv_item_attribs_springs_master['item_id'] = hid;
		//$scope.inv_item_attribs_springs_master['item_id'] = $scope.trans_id;
		$scope.inv_item_attribs_springs_master1['action'] = 'SELECT_INV_ITEM_ATTRIBS_SPRINGS_MASTER_ITEM';
		db_inv_item_attribs_springs_master1['trans'] = $scope.inv_item_attribs_springs_master1;
		db_inv_item_attribs_springs_master1['proc'] = 'inv_item_attribs_springs_masterOps';
		$http.post('/db_data',db_inv_item_attribs_springs_master1).success(function(response){
			console.log(response);
			if (response.error!='None'){
				$scope.inv_item_attribs_springs_master1_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_attribs_springs_master1List = response.data[0];
				//if ($scope.inv_item_attribs_springs_master1List.length>0)
					//$scope.inv_item_attribs_springs_master1=response.data[0][0];
			}
		});
	};

	$scope.save_inv_item_attribs_springs_master_record = function() {
		if ($scope.trans_id < 1){
			$scope.inv_item_attribs_springs_master_status = 'Please create or select master entry..';
			return;
		}
		if ($scope.inv_item_attribs_springs_master['sysid'] == undefined)
		 $scope.inv_item_attribs_springs_master['action'] = 'INSERT_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
					 
		db_inv_item_attribs_springs_master['trans'] = $scope.inv_item_attribs_springs_master;
		db_inv_item_attribs_springs_master['proc'] = 'inv_item_attribs_springs_masterOps';
		$http.post('/db_data',db_inv_item_attribs_springs_master).success(function(response){
			console.log(response);
			if (response.error!='None'){
				$scope.inv_item_attribs_springs_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_attribs_springs_master_status = response.data[0][0].msg;
				 var short_code = $scope.inv_item_attribs_springs_master['short_code'];
				 var item_id = $scope.inv_item_attribs_springs_master['item_id'];	
				 $scope.inv_item_attribs_springs_master = {};
				 $scope.inv_item_attribs_springs_master['item_id'] = item_id;
       			 $scope.inv_item_attribs_springs_master['short_code'] = short_code
				 $scope.inv_item_attribs_springs_master['action'] = 'INSERT_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
				//db_inv_item_attribs_springs_master = {};
				select_inv_item_attribs_springs_master_record();
			}
		});
	}

	$scope.delete_inv_item_attribs_springs_master_record = function(sysid) {
		$scope.inv_item_attribs_springs_master['sysid'] = sysid;
		$scope.inv_item_attribs_springs_master['action'] = 'DELETE_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
		db_inv_item_attribs_springs_master['trans'] = $scope.inv_item_attribs_springs_master;
		db_inv_item_attribs_springs_master['proc'] = 'inv_item_attribs_springs_masterOps';
		$http.post('/db_data',db_inv_item_attribs_springs_master).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_attribs_springs_master_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_attribs_springs_master_status = response.data[0][0].msg;
				//$scope.inv_item_attribs_springs_master = {};
				//db_inv_item_attribs_springs_master = {};
				select_inv_item_attribs_springs_master_record();
			}
		});
	}

	$scope.insert_inv_item_attribs_springs_master_record = function() {
		$scope.inv_item_attribs_springs_master = {status: 'Active'}
		$scope.inv_item_attribs_springs_master['action'] = 'INSERT_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
		//hid = undefined;
		//$scope.inv_item_attribs_springs_master_status = '';
	}

	$scope.update_inv_item_attribs_springs_master_record = function(x) {
		$scope.inv_item_attribs_springs_master = x;
		$scope.inv_item_attribs_springs_master['action'] = 'UPDATE_INV_ITEM_ATTRIBS_SPRINGS_MASTER';
		hid = x['sysid'];
		//$scope.inv_item_attribs_springs_master_status = '';
	}

	var select_inv_item_heating_record = function() {
		$scope.inv_item_heating1['action'] = 'SELECT_INV_ITEM_HEATING_ITEM';
		db_inv_item_heating1['trans'] = $scope.inv_item_heating1;
		db_inv_item_heating1['proc'] = 'inv_item_heatingOps';
		$http.post('/db_data',db_inv_item_heating1).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_heating1_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_heating1List = response.data[0];
				//if ($scope.inv_item_heatingList.length>0)
					//$scope.inv_item_heating=response.data[0][0];
			}
		});
	};

	$scope.save_inv_item_heating_record = function() {
		if ($scope.trans_id < 1){
			$scope.inv_item_heating_status = 'Please create or select master entry..';
			return;
		}
		if ($scope.inv_item_heating['sysid'] == undefined)
		 $scope.inv_item_heating['action'] = 'INSERT_INV_ITEM_HEATING';
		db_inv_item_heating['trans'] = $scope.inv_item_heating;
		db_inv_item_heating['proc'] = 'inv_item_heatingOps';
		$http.post('/db_data',db_inv_item_heating).success(function(response){
			console.log(response);
			if (response.error!='None'){
				$scope.inv_item_heating_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_heating_status = response.data[0].msg;
				var heating_item_id = $scope.inv_item_heating['item_id'];
				$scope.inv_item_heating = {};
				$scope.inv_item_heating['item_id'] = heating_item_id;
				$scope.inv_item_heating['action'] = 'INSERT_INV_ITEM_HEATING';
				//db_inv_item_heating = {};
				select_inv_item_heating_record();
			}
		});
	}

	$scope.delete_inv_item_heating_record = function(sysid) {
		$scope.inv_item_heating['sysid'] = sysid;
		$scope.inv_item_heating['action'] = 'DELETE_INV_ITEM_HEATING';
		db_inv_item_heating['trans'] = $scope.inv_item_heating;
		db_inv_item_heating['proc'] = 'inv_item_heatingOps';
		$http.post('/db_data',db_inv_item_heating).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_heating_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_heating_status = response.data[0][0].msg;
				//$scope.inv_item_heating = {};
				//db_inv_item_heating = {};
				select_inv_item_heating_record();
			}
		});
	}

	$scope.insert_inv_item_heating_record = function() {
		$scope.inv_item_heating = {status: 'Active'}
		$scope.inv_item_heating['action'] = 'INSERT_INV_ITEM_HEATING';
		//hid = undefined;
		//$scope.inv_item_heating_status = '';
	}

	$scope.update_inv_item_heating_record = function(x) {
		$scope.inv_item_heating = x;
		$scope.inv_item_heating['action'] = 'UPDATE_INV_ITEM_HEATING';
		hid = x['sysid'];
		//$scope.inv_item_heating_status = '';
	}

	var select_inv_item_load_test_record = function() {
		//$scope.inv_item_load_test['item_id'] = $scope.trans_id;
		$scope.inv_item_load_test1['action'] = 'SELECT_INV_ITEM_LOAD_TEST_ITEM';
		db_inv_item_load_test1['trans'] = $scope.inv_item_load_test1;
		db_inv_item_load_test1['proc'] = 'inv_item_load_testOps';
		$http.post('/db_data',db_inv_item_load_test1).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_load_test1_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_load_test1List = response.data[0];
				//if ($scope.inv_item_load_testList.length>0)
				//	$scope.inv_item_load_test=response.data[0][0];
			}
		});
	};

	$scope.save_inv_item_load_test_record = function() {
		if ($scope.trans_id < 1){
			$scope.inv_item_load_test_status = 'Please create or select master entry..';
			return;
		}
			if ($scope.inv_item_load_test['sysid'] == undefined)
		 $scope.inv_item_load_test['action'] = 'INSERT_INV_ITEM_LOAD_TEST';
		db_inv_item_load_test['trans'] = $scope.inv_item_load_test;
		db_inv_item_load_test['proc'] = 'inv_item_load_testOps';
		$http.post('/db_data',db_inv_item_load_test).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_load_test_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
				$scope.inv_item_load_test_status = response.data[0][0].msg;
				var load_item_id = $scope.inv_item_load_test['item_id'];
				$scope.inv_item_load_test = {};
				$scope.inv_item_load_test['item_id'] = load_item_id;
				$scope.inv_item_load_test['action'] = 'INSERT_INV_ITEM_LOAD_TEST';
				//db_inv_item_load_test = {};
				select_inv_item_load_test_record();
			}
		});
	}

	$scope.delete_inv_item_load_test_record = function(sysid) {
		$scope.inv_item_load_test['sysid'] = sysid;
		$scope.inv_item_load_test['action'] = 'DELETE_INV_ITEM_LOAD_TEST';
		db_inv_item_load_test['trans'] = $scope.inv_item_load_test;
		db_inv_item_load_test['proc'] = 'inv_item_load_testOps';
		$http.post('/db_data',db_inv_item_load_test).success(function(response){
			if (response.error!='None'){
				$scope.inv_item_load_test_status = response.error['sqlMessage'].substring(0,99);
			}
			else{
			$scope.inv_item_load_test_status = response.data[0][0].msg;
				//$scope.inv_item_load_test = {};
				//db_inv_item_load_test = {};
				select_inv_item_load_test_record();
			}
		});
	}

	$scope.insert_inv_item_load_test_record = function() {
		$scope.inv_item_load_test = {status: 'Active'}
		$scope.inv_item_load_test['action'] = 'INSERT_INV_ITEM_LOAD_TEST';
		//hid = undefined;
		//$scope.inv_item_load_test_status = '';
	}

	$scope.update_inv_item_load_test_record = function(x) {
		$scope.inv_item_load_test = x;
		$scope.inv_item_load_test['action'] = 'UPDATE_INV_ITEM_LOAD_TEST';
		hid = x['sysid'];
		//$scope.inv_item_load_test_status = '';
	}

})