//模块化
var mainModule = angular.module('mainModule', ['ui.router',
				'ngResource', 'ngSanitize','angular-loading-bar','ngAnimate','angular-iscroll']);

//全局配置
mainModule.run(['$rootScope','$state','$http','$stateParams','$location','$timeout','$window',
	function($rootScope, $state, $http, $stateParams, $location,$timeout,$window) {}]);

///路由配置
mainModule.config(['$stateProvider','$urlRouterProvider','$compileProvider',
	function($stateProvider,$urlRouterProvider,$compileProvider) {
	$stateProvider.state('index',{
		url : '/index',               
		templateUrl : 'src/tmp/index.html'
	});
	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|sms):/);
	$urlRouterProvider.otherwise('/index');   //默认home
}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = '<div>Loading...</div>';
}]);

