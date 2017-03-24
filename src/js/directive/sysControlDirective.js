mainModule.directive("roleDialog",[function(){
	 return {  
        restrict: 'AE',  
        link:function(scope,element,attrs){
        },
        templateUrl:'src/tmp/sysControl/dialog/roleDialog.html'
    } 
}]).directive("addSysuserDialog",[function(){
    return {
        restrict: 'AE',
        link:function(scope,element,attrs){
        },
        templateUrl:'src/tmp/sysControl/dialog/addSysUserDialog.html'
    }
}]).directive("addMenuDialog",[function(){
    return {
        restrict: 'AE',
        link:function(scope,element,attrs){
        },
        templateUrl:'src/tmp/sysControl/dialog/addMenuDialog.html'
    }
}]).directive("bankCardDialog",[function(){
    return {
        restrict: 'AE',
        link:function(scope,element,attrs){
        },
        templateUrl:'src/tmp/sysControl/dialog/bankCardDialog.html'
    }
}])