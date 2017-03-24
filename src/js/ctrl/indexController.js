mainModule.controller('indexCtrl', ['$scope', '$rootScope',
				'$state', 'indexServ',function($scope, $rootScope, $state,indexServ) {
	indexServ.loadMenu().then(function(res){
		$scope.menuDatas = res.data.data;
	})
	$scope.loginOut = function(){
		location.href='login.html';
	}
}])