var app = angular.module('ebs2App');
app.controller('cont_menuCtrl', function ($scope, $http, $routeParams, $location, $rootScope) {
$scope.sub_sub_menu_list = _.where($rootScope.sub_sub_main_menu_list,{parent_id: 119});
})