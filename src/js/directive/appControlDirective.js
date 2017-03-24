mainModule.directive("versionManageDialog",[function(){
	 return {  
        restrict: 'AE',
        link:function(scope,element,attrs){
        },
        templateUrl:"src/tmp/appControl/dialog/versionManageDialog.html"
    } 
}]).directive("announceManageDialog",[function(){
    return {
        restrict: 'AE',
        link:function(scope,element,attrs){
        },
        templateUrl:"src/tmp/appControl/dialog/announceManageDialog.html"
    }
}]);