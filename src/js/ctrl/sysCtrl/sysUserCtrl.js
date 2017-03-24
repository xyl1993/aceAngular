mainModule.controller('sysUserCtrl', ['$scope', '$rootScope',
				'$state', 'sysServ',function($scope, $rootScope, $state,sysServ) {
    $scope.userModel = {};
    $scope.selectAll = function (event) {
        //全选
        var action = event.target;
        if(action.checked){//选中，就添加
            $('.sysUserCheckd').prop("checked","true");
        }else{//去除就删除result里
            $('.sysUserCheckd').removeAttr("checked");
        }
    };
    $scope.select = function (event) {
        //单选
        var action = event.target,
            state = true,
            $arry = $('.sysUserCheckd');
        if(action.checked){//选中，就添加
            for(var i=0,len = $arry.length;i<len;i++){
                if(!$($arry[i]).is(':checked')){
                    state = false;
                    return;
                }
            }
            if(state){
                $('#sysUserSelectAll').prop("checked","true");
            }
        }else{//去除就删除result里
            $('#sysUserSelectAll').removeAttr("checked");
        }
    }
    $scope.saveUser = function(){
        //保存
        console.log($scope.userModel);
    };
    sysServ.getSysUser().then(function (res) {
        //获取初始化数据
        if(res.data.code == 200){
            $scope.lists = res.data.data;
        }
    });
    $scope.add = function(){
        $('#sysUserDialog').modal({
            keyboard:false
        })
	};
    $scope.edit = function(data){
        $scope.userModel = data;
        $('#sysUserDialog').modal({
            keyboard:false
        })
    };
    $scope.del = function(){
        bootbox.confirm("确认删除么?", function(result) {
            if(result) {
                //
            }
        });
    };
    $scope.startAll = function(){
        if ($(".sysUserCheckd:checked").length != 0) {
            bootbox.confirm("确认启用么?", function (result) {
                if (!result) {
                }
            });
        } else {
            bootbox.alert("请先选择数据");
        }
    };
    $scope.stopAll = function(){
        if ($(".sysUserCheckd:checked").length != 0) {
            bootbox.confirm("确认禁用么?", function (result) {
                if (result) {
                    //
                }
            });
        } else {
            bootbox.alert("请先选择数据");
        }
    };
    $scope.start = function(){
        bootbox.confirm("确认启用么?", function(result) {
            if(result) {
                //
            }
        });
    };
    $scope.stop = function(){
        bootbox.confirm("确认禁用么?", function(result) {
            if(result) {
                //
            }
        });
    }
}]);