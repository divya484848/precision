var underscore = angular.module('underscore',[])
underscore.factory('_', function(){
   return  window._; 
});

var app = angular.module('ebs2App',['ngRoute','angularMoment','angularUtils.directives.dirPagination']);

app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({enabled: true, requireBase: true});

//Routes start
	$routeProvider
	.when('/',{
		templateUrl: 'modules/admin/login/login.html',
		controller: 'loginCtrl'
	})
	.when('/dashboard',{
		templateUrl: 'modules/admin/dashboard/dashboard.html',
		controller: 'dashboardCtrl'
	})
	.when('/company',{
		templateUrl: 'modules/admin/company/company.html',
		controller: 'companyCtrl'
	})
	.when('/dept',{
		templateUrl: 'modules/admin/dept/dept.html',
		controller: 'deptCtrl'
	})
	.when('/roles',{
		templateUrl: 'modules/admin/roles/roles.html',
		controller: 'rolesCtrl'
	})
	.when('/currency',{
		templateUrl: 'modules/admin/currency/currency.html',
		controller: 'currencyCtrl'
	})
	.when('/user_accounts',{
		templateUrl: 'modules/admin/user_accounts/user_accounts.html',
		controller: 'user_accountsCtrl'
	})
	.when('/emp',{
		templateUrl: 'modules/hrms/emp/emp.html',
		controller: 'empCtrl'
	})
	.when('/emp_form',{
		templateUrl: 'modules/hrms/emp_form/emp_form.html',
		controller: 'emp_formCtrl'
	})
	.when('/emplist',{
		templateUrl: 'modules/hrms/emplist/emplist.html',
		controller: 'emplistCtrl'
	})
	.when('/emp_form/:id',{
		templateUrl: 'modules/hrms/emp_form/emp_form.html',
		controller: 'emp_formCtrl'
	})
	.when('/shifts',{
		templateUrl: 'modules/hrms/shifts/shifts.html',
		controller: 'shiftsCtrl'
	})
	.when('/custlist',{
		templateUrl: 'modules/inv/custlist/custlist.html',
		controller: 'custlistCtrl'
	})
	.when('/cust',{
		templateUrl: 'modules/inv/cust/cust.html',
		controller: 'custCtrl'
	})
	.when('/cust/:id',{
		templateUrl: 'modules/inv/cust/cust.html',
		controller: 'custCtrl'
	})
	.when('/supplist',{
		templateUrl: 'modules/inv/supplist/supplist.html',
		controller: 'supplistCtrl'
	})
	.when('/supp',{
		templateUrl: 'modules/inv/supp/supp.html',
		controller: 'suppCtrl'
	})
	.when('/supp/:id',{
		templateUrl: 'modules/inv/supp/supp.html',
		controller: 'suppCtrl'
	})
	.when('/item_master_list',{
		templateUrl: 'modules/inv/item_master_list/item_master_list.html',
		controller: 'item_master_listCtrl'
	})
	.when('/item_master',{
		templateUrl: 'modules/inv/item_master/item_master.html',
		controller: 'item_masterCtrl'
	})
	.when('/item_master/:id',{
		templateUrl: 'modules/inv/item_master/item_master.html',
		controller: 'item_masterCtrl'
	})
	.when('/fglist',{
		templateUrl: 'modules/inv/fglist/fglist.html',
		controller: 'fglistCtrl'
	})
	.when('/stores',{
		templateUrl: 'modules/inv/stores/stores.html',
		controller: 'storesCtrl'
	})
	.when('/tax_invoice_list',{
		templateUrl: 'modules/sales/tax_invoice_list/tax_invoice_list.html',
		controller: 'tax_invoice_listCtrl'
	})
	.when('/dbk_details',{
		templateUrl: 'modules/sales/dbk_details/dbk_details.html',
		controller: 'dbk_detailsCtrl'
	})
	.when('/dbk_update',{
		templateUrl: 'modules/sales/dbk_update/dbk_update.html',
		controller: 'dbk_updateCtrl'
	})
	.when('/access_control',{
		templateUrl: 'modules/admin/access_control/access_control.html',
		controller: 'access_controlCtrl'
	})
	.when('/opbal',{
		templateUrl: 'modules/inv/opbal/opbal.html',
		controller: 'opbalCtrl'
	})
	.when('/machines',{
		templateUrl: 'modules/inv/machines/machines.html',
		controller: 'machinesCtrl'
	})
	.when('/item_process_list',{
		templateUrl: 'modules/prod/item_process_list/item_process_list.html',
		controller: 'item_process_listCtrl'
	})
	.when('/item_process',{
		templateUrl: 'modules/prod/item_process/item_process.html',
		controller: 'item_processCtrl'
	})
	.when('/item_process/:id',{
		templateUrl: 'modules/prod/item_process/item_process.html',
		controller: 'item_processCtrl'
	})
	.when('/gindept_list',{
		templateUrl: 'modules/inv/gindept_list/gindept_list.html',
		controller: 'gindept_listCtrl'
	})
	.when('/gindept',{
		templateUrl: 'modules/inv/gindept/gindept.html',
		controller: 'gindeptCtrl'
	})
	.when('/gindept_print/:id',{
		templateUrl: 'modules/inv/gindept_print/gindept_print.html',
		controller: 'gindept_printCtrl'
	})
	.when('/ginvendor_list',{
		templateUrl: 'modules/inv/ginvendor_list/ginvendor_list.html',
		controller: 'ginvendor_listCtrl'
	})
	.when('/ginvendor',{
		templateUrl: 'modules/inv/ginvendor/ginvendor.html',
		controller: 'ginvendorCtrl'
	})
	.when('/ginvendor/:id',{
		templateUrl: 'modules/inv/ginvendor/ginvendor.html',
		controller: 'ginvendorCtrl'
	})
	.when('/grndept_list',{
		templateUrl: 'modules/inv/grndept_list/grndept_list.html',
		controller: 'grndept_listCtrl'
	})
	.when('/grndept',{
		templateUrl: 'modules/inv/grndept/grndept.html',
		controller: 'grndeptCtrl'
	})
	.when('/grndept/:id',{
		templateUrl: 'modules/inv/grndept/grndept.html',
		controller: 'grndeptCtrl'
	})
	.when('/grnvendor_list',{
		templateUrl: 'modules/inv/grnvendor_list/grnvendor_list.html',
		controller: 'grnvendor_listCtrl'
	})
	.when('/grnvendor',{
		templateUrl: 'modules/inv/grnvendor/grnvendor.html',
		controller: 'grnvendorCtrl'
	})
	.when('/grnvendor/:id',{
		templateUrl: 'modules/inv/grnvendor/grnvendor.html',
		controller: 'grnvendorCtrl'
	})
	.when('/ginvendor_print/:id',{
		templateUrl: 'modules/inv/ginvendor_print/ginvendor_print.html',
		controller: 'ginvendor_printCtrl'
	})
	.when('/grndept_list/:id',{
		templateUrl: 'modules/inv/grndept_list/grndept_list.html',
		controller: 'grndept_listCtrl'
	})
	.when('/grndept_print/:id',{
		templateUrl: 'modules/inv/grndept_print/grndept_print.html',
		controller: 'grndept_printCtrl'
	})
	.when('/grnvendor_print/:id',{
		templateUrl: 'modules/inv/grnvendor_print/grnvendor_print.html',
		controller: 'grnvendor_printCtrl'
	})
	.when('/mat_ledger',{
		templateUrl: 'modules/inv/mat_ledger/mat_ledger.html',
		controller: 'mat_ledgerCtrl'
	})
	.when('/brass_ledger',{
		templateUrl: 'modules/inv/brass_ledger/brass_ledger.html',
		controller: 'brass_ledgerCtrl'
	})
	.when('/all_ledger',{
		templateUrl: 'modules/inv/all_ledger/all_ledger.html',
		controller: 'all_ledgerCtrl'
	})
	.when('/diecast_ledger',{
		templateUrl: 'modules/inv/diecast_ledger/diecast_ledger.html',
		controller: 'diecast_ledgerCtrl'
	})
	.when('/app_center',{
		templateUrl: 'modules/inv/app_center/app_center.html',
		controller: 'app_centerCtrl'
	})
	.when('/invoice_reports',{
		templateUrl: 'modules/sales/invoice_reports/invoice_reports.html',
		controller: 'invoice_reportsCtrl'
	})
	.when('/invoice_settings',{
		templateUrl: 'modules/sales/invoice_settings/invoice_settings.html',
		controller: 'invoice_settingsCtrl'
	})
	.when('/pay_terms',{
		templateUrl: 'modules/sales/pay_terms/pay_terms.html',
		controller: 'pay_termsCtrl'
	})
	.when('/invoice_mat_type',{
		templateUrl: 'modules/sales/invoice_mat_type/invoice_mat_type.html',
		controller: 'invoice_mat_typeCtrl'
	})
	.when('/sales_order_list',{
		templateUrl: 'modules/sales/sales_order_list/sales_order_list.html',
		controller: 'sales_order_listCtrl'
	})
	.when('/sales_order',{
		templateUrl: 'modules/sales/sales_order/sales_order.html',
		controller: 'sales_orderCtrl'
	})
	.when('/sales_order/:id',{
		templateUrl: 'modules/sales/sales_order/sales_order.html',
		controller: 'sales_orderCtrl'
	})
	.when('/missing_hsn',{
		templateUrl: 'modules/sales/missing_hsn/missing_hsn.html',
		controller: 'missing_hsnCtrl'
	})
	.when('/hsn_report',{
		templateUrl: 'modules/sales/hsn_report/hsn_report.html',
		controller: 'hsn_reportCtrl'
	})
	.when('/cust_sales_report',{
		templateUrl: 'modules/sales/cust_sales_report/cust_sales_report.html',
		controller: 'cust_sales_reportCtrl'
	})
	.when('/sales_compare',{
		templateUrl: 'modules/sales/sales_compare/sales_compare.html',
		controller: 'sales_compareCtrl'
	})
	.when('/op_bal_update',{
		templateUrl: 'modules/inv/op_bal_update/op_bal_update.html',
		controller: 'op_bal_updateCtrl'
	})
	.when('/gindeptrep',{
		templateUrl: 'modules/inv/gindeptrep/gindeptrep.html',
		controller: 'gindeptrepCtrl'
	})
	.when('/inv_reports',{
		templateUrl: 'modules/inv/inv_reports/inv_reports.html',
		controller: 'inv_reportsCtrl'
	})
	.when('/polish_report_issue',{
		templateUrl: 'modules/inv/polish_report_issue/polish_report_issue.html',
		controller: 'polish_report_issueCtrl'
	})
	.when('/prod_mat_list',{
		templateUrl: 'modules/prod/prod_mat_list/prod_mat_list.html',
		controller: 'prod_mat_listCtrl'
	})
	.when('/prod_mat',{
		templateUrl: 'modules/prod/prod_mat/prod_mat.html',
		controller: 'prod_matCtrl'
	})
	.when('/prod_mat/:id',{
		templateUrl: 'modules/prod/prod_mat/prod_mat.html',
		controller: 'prod_matCtrl'
	})
	.when('/vendor_mgmt',{
		templateUrl: 'modules/inv/vendor_mgmt/vendor_mgmt.html',
		controller: 'vendor_mgmtCtrl'
	})
	.when('/supp_item_process',{
		templateUrl: 'modules/inv/supp_item_process/supp_item_process.html',
		controller: 'supp_item_processCtrl'
	})
	.when('/supp_items',{
		templateUrl: 'modules/inv/supp_items/supp_items.html',
		controller: 'supp_itemsCtrl'
	})
	.when('/vendor_bill',{
		templateUrl: 'modules/inv/vendor_bill/vendor_bill.html',
		controller: 'vendor_billCtrl'
	})
	.when('/gindept_list_master',{
		templateUrl: 'modules/inv/gindept_list_master/gindept_list_master.html',
		controller: 'gindept_list_masterCtrl'
	})
	.when('/master_stores',{
		templateUrl: 'modules/inv/master_stores/master_stores.html',
		controller: 'master_storesCtrl'
	})
	.when('/gindept_master',{
		templateUrl: 'modules/inv/gindept_master/gindept_master.html',
		controller: 'gindept_masterCtrl'
	})
	.when('/access_profile',{
		templateUrl: 'modules/admin/access_profile/access_profile.html',
		controller: 'access_profileCtrl'
	})
	.when('/om_require',{
		templateUrl: 'modules/inv/om_require/om_require.html',
		controller: 'om_requireCtrl'
	})
	.when('/prod_planning',{
		templateUrl: 'modules/prod/prod_planning/prod_planning.html',
		controller: 'prod_planningCtrl'
	})
	.when('/so_mat_reqmt',{
		templateUrl: 'modules/prod/so_mat_reqmt/so_mat_reqmt.html',
		controller: 'so_mat_reqmtCtrl'
	})
	.when('/prod_dash',{
		templateUrl: 'modules/prod/prod_dash/prod_dash.html',
		controller: 'prod_dashCtrl'
	})
	.when('/stock_report',{
		templateUrl: 'modules/inv/stock_report/stock_report.html',
		controller: 'stock_reportCtrl'
	})
	.when('/product_group',{
		templateUrl: 'modules/prod/product_group/product_group.html',
		controller: 'product_groupCtrl'
	})
	.when('/packing_dash',{
		templateUrl: 'modules/prod/packing_dash/packing_dash.html',
		controller: 'packing_dashCtrl'
	})
	.when('/plating_dash',{
		templateUrl: 'modules/prod/plating_dash/plating_dash.html',
		controller: 'plating_dashCtrl'
	})
	.when('/polish_dash',{
		templateUrl: 'modules/prod/polish_dash/polish_dash.html',
		controller: 'polish_dashCtrl'
	})
	.when('/vendor_ledger',{
		templateUrl: 'modules/inv/vendor_ledger/vendor_ledger.html',
		controller: 'vendor_ledgerCtrl'
	})
	.when('/dept_ledger',{
		templateUrl: 'modules/inv/dept_ledger/dept_ledger.html',
		controller: 'dept_ledgerCtrl'
	})
	.otherwise({
		redirectTo: '/pagenotadded'
	})	
}]);

app.directive('datetimepicker', function(){
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, element, attrs, ngModel){

            if(!ngModel) return; // do nothing if no ng-model

            ngModel.$render = function(){
                element.find('input').val( ngModel.$viewValue || '' );
            }

            element.datetimepicker({ 
                language: 'it' 
            });

            element.on('dp.change', function(){
                scope.$apply(read);
            });

            read();

            function read() {
                var value = element.find('input').val();
                ngModel.$setViewValue(value);
            }
        }
    }
});

app.controller('ebs2Ctrl',function($scope, $rootScope){
	$rootScope.menus = false;
	google.charts.load("current", {packages:["corechart"]});
})

