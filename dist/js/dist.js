//模块化
var mainModule = angular.module('mainModule', ['ui.router',
				'ngResource', 'ngSanitize','angular-loading-bar','ngAnimate']);

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


mainModule.controller('indexCtrl', ['$scope', '$rootScope',
				'$state', 'indexServ',function($scope, $rootScope, $state,indexServ) {
	indexServ.loadMenu().then(function(res){
		$scope.menuDatas = res.data.data;
	})
	$scope.loginOut = function(){
		location.href='login.html';
	}
}])
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
mainModule.directive("equelframe",[function(){
	 return {  
        restrict: 'AE',  
        link:function(scope,element,attrs){
        	scope.getContentUrl = function(){
        		var src = $(element).parent().data('src');
        	    return src;
        	}
        },
        template:'<div ng-include="getContentUrl()"></div>'
    } 
}]).directive("tabContentDirective",[function(){
    /**
     * 根据url生成菜单
     */
	 return {  
	        restrict: 'AE',  
	        scope: true,
	        link:function(scope,element,attrs){
	        	
	        },
	        templateUrl: function(elem,attrs) {
	            return attrs.url
	        }
	    } 
}]).directive("topTagClose",[function(){
	/**
	 * 菜单右击关闭弹出窗
	 */
	return {
		restrict: 'AE',
		scope: true,
        templateUrl: 'src/tmp/baseTmp/topTagClose.html',
		link:function(scope,element,attrs){
            var flag = attrs.flag;
			if(flag=='home'){
				$('#closeThis').addClass('menu-disabled');
                $('#closeThis').click(function (event) {
                    return false;//阻止事件冒泡
                })
			}else{
				$('#closeThis').click(function (event) {
                    $('#'+flag).remove();
					$(this).closest('.top-menu-list').remove();
					var lastTab = $('#menu').children(".top-menu-list:last-child");
					var category = lastTab.data('category');
					if($('#menu').children(".top-menu-list.active").length==0){
						lastTab.addClass('active');
						$('#'+category).show();
					}
				})
			}
			$('#closeOther').click(function () {
				$('#'+flag).siblings('.not-main-tab').remove();
				$(this).closest('.top-menu-list').siblings('.not-main-tab').remove();
				$(this).closest('.top-menu-list').addClass('active');
				$('#'+flag).show();
			});
            $(":not(.top-tag-ul *)").click(function(){
                $('#closeTag').remove();
            });
		}
	}
}]).directive("mainDirective",[function(){
    /**
     * 首页指令
     */
	 return {  
	        restrict: 'AE',  
	        scope: true,
	        link:function(scope,element,attrs){
	        	
	        },
	        templateUrl:'src/tmp/main.html'
	    } 
}]).directive("topMenu",['$compile',function($compile){
    /**
     * tab目录切换指令&&右击关闭指令
     */
	 return {  
        restrict: 'AE',  
        link:function(scope,element,attrs){
        	$(element).click(function(){
        	    var flag = $(element).data('category');
        	    $('#'+flag).show();
        	    $('#'+flag).siblings().hide();
        	})
            //鼠标右击事件
			$(element)[0].oncontextmenu = function(){
				$('#closeTag').remove();
				var _menu = '<top-tag-close id="closeTag" data-flag='+$(this).data('category')+'></top-tag-close>';
				$(this).append($compile(_menu)(scope));
				return false;
			}
        }
    } 
}]).directive("closeTopTab",[function(){
    /**
     * tab目录关闭指令
     */
    return {
        restrict: 'AE',
        link:function(scope,element,attrs){
            $(element).click(function(){
                var flag = $(this).data('category');
                $('#'+flag).remove();
                $(this).closest('li').remove();
                if($('#menu').children("li.active").length==0){
                    var lastTab = $('#menu').children("li:last-child");
                    lastTab.addClass('active');
                    var category = lastTab.data('category');
                    $('#'+category).show();
                }
            })
        }
    }
}]).directive("leftMenu",['$compile',function($compile){
    /**
     * 菜单点击事件
     */
	 return {  
        restrict: 'AE',  
        link:function(scope,element,attrs){
        	$(element).click(function(){
				var maxWith = $('#menu').width(),
                    sumWidth = 0,
                    menuName = $(this).data('name'),
                    type = $(this).data('type'),
                    url = $(this).data('url'),
                    topListAry = $('.top-menu-list');
        	    if($('[data-category='+type+']').length!=0){
					$('.top-menu-list').removeClass('active');
					$('.child-content').hide();
        	    	$('li[data-category='+type+']').addClass('active');
    	        	$('div[data-category='+type+']').show();
        	    }else{ 
					for(var i=0,len = topListAry.length;i<len;i++){
						sumWidth = sumWidth+$(topListAry[i]).width();
					}
					if(sumWidth+130>maxWith){
						bootbox.alert("不能在添加啦");
						return;
					}
					$('.top-menu-list').removeClass('active');
					$('.child-content').hide();
        	        var _temp = '<li class="active top-menu-list not-main-tab" data-category = "'+type+'" top-menu >'+
				                  '<a data-toggle="tab">'+menuName+'<span class="icon-remove" data-category = "'+type+'" close-top-tab></span>'+'</a>'+
				                 '</li>';
                    var _childHtml = "<div data-category = '"+type+"' id='"+type+"' class='child-content not-main-tab'>"+
     	    							'<tab-content-directive url='+url+'></tab-content-directive>'+
     	                              '</div>';
                    var $_temp = $compile(_temp)(scope);
                    var $_childHtml = $compile(_childHtml)(scope);
                    $('#menu').append($_temp);
                    $('#content-dyn').append($_childHtml);
        	    }
                $('.left-tab-menu').removeClass('active');
                $(element).addClass('active');
        	})
        }
    } 
}]).directive("bootstrapTabClick",[function(){
    /**
     * bootstrap tab页切换指令
     */
	 return {  
	        restrict: 'AE',  
	        link:function(scope,element,attrs){
	        	$(element).click(function(){
	        	    var href = $(this).data('href');
	        	    $(href).show();
	        	    $(href).siblings().hide();
	        	})
	        }
	    } 
	}]);
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
mainModule.factory('appServ', ['$http',
    function($http) {
        var serv = {
            getVersionDatas: function() {
                return $http({
                    method: 'get',
                    ignoreLoadingBar: true,
                    url: 'src/data/role.json'
                })
            },
            getAnnounceDatas: function() {
                return $http({
                    method: 'get',
                    ignoreLoadingBar: true,
                    url: 'src/data/role.json'
                })
            }
        };
        return serv;
    }
]);

mainModule.factory('indexServ', ['$http',
    function($http) {
        var serv = {
            loadMenu: function() {
                return $http({
                    method: 'get',
                    ignoreLoadingBar: true,
                    url: 'src/data/menu.json'
                })
            }
        }
        return serv;
    }
]);

mainModule.factory('sysServ', ['$http',
    function($http) {
        var serv = {
            getRole: function() {
                return $http({
                    method: 'get',
                    ignoreLoadingBar: true,
                    url: 'src/data/role.json'
                })
            },
            getSysUser: function() {
                return $http({
                    method: 'get',
                    ignoreLoadingBar: true,
                    url: 'src/data/sysUser.json'
                })
            },
            getBankCard: function() {
                return $http({
                    method: 'get',
                    ignoreLoadingBar: true,
                    url: 'src/data/bankCardAudit.json'
                })
            }
        };
        return serv;
    }
]);

mainModule.controller('announceManageCtrl', ['$scope', '$rootScope',
				'$state', 'appServ',function($scope, $rootScope, $state,appServ) {
    $scope.userModel = {};
    $scope.selectAll = function (event) {
        //全选
        var action = event.target;
        if(action.checked){//选中，就添加
            $('.announceManageCheckd').prop("checked","true");
        }else{//去除就删除result里
            $('.announceManageCheckd').removeAttr("checked");
        }
    };
    $scope.select = function (event) {
        //单选
        var action = event.target,
            state = true,
            $arry = $('.announceManageCheckd');
        if(action.checked){//选中，就添加
            for(var i=0,len = $arry.length;i<len;i++){
                if(!$($arry[i]).is(':checked')){
                    state = false;
                    return;
                }
            }
            if(state){
                $('#announceManageSelectAll').prop("checked","true");
            }
        }else{//去除就删除result里
            $('#announceManageSelectAll').removeAttr("checked");
        }
    }
    $scope.saveUser = function(){
        //保存
        console.log($scope.userModel);
    };
    appServ.getAnnounceDatas().then(function (res) {
        //获取初始化数据
        if(res.data.code == 200){
            $scope.lists = res.data.data;
        }
    });
    $scope.add = function(){
        $('#announceManageDialog').modal({
            keyboard:false
        })
	};
    $scope.edit = function(data){
        $scope.userModel = data;
        $('#announceManageDialog').modal({
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
        if ($(".announceManageCheckd:checked").length != 0) {
            bootbox.confirm("确认启用么?", function (result) {
                if (!result) {
                }
            });
        } else {
            bootbox.alert("请先选择数据");
        }
    };
    $scope.stopAll = function(){
        if ($(".announceManageCheckd:checked").length != 0) {
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
mainModule.controller('versionManageCtrl', ['$scope', '$rootScope',
				'$state', 'appServ',function($scope, $rootScope, $state,appServ) {
    $scope.userModel = {};
    $scope.selectAll = function (event) {
        //全选
        var action = event.target;
        if(action.checked){//选中，就添加
            $('.versionManageCheckd').prop("checked","true");
        }else{//去除就删除result里
            $('.versionManageCheckd').removeAttr("checked");
        }
    };
    $scope.select = function (event) {
        //单选
        var action = event.target,
            state = true,
            $arry = $('.versionManageCheckd');
        if(action.checked){//选中，就添加
            for(var i=0,len = $arry.length;i<len;i++){
                if(!$($arry[i]).is(':checked')){
                    state = false;
                    return;
                }
            }
            if(state){
                $('#versionManageSelectAll').prop("checked","true");
            }
        }else{//去除就删除result里
            $('#versionManageSelectAll').removeAttr("checked");
        }
    }
    $scope.saveUser = function(){
        //保存
        console.log($scope.userModel);
    };
    appServ.getVersionDatas().then(function (res) {
        //获取初始化数据
        if(res.data.code == 200){
            $scope.lists = res.data.data;
        }
    });
    $scope.add = function(){
        $('#versionManageDialog').modal({
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
        if ($(".versionManageCheckd:checked").length != 0) {
            bootbox.confirm("确认启用么?", function (result) {
                if (!result) {
                }
            });
        } else {
            bootbox.alert("请先选择数据");
        }
    };
    $scope.stopAll = function(){
        if ($(".versionManageCheckd:checked").length != 0) {
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
mainModule.controller('authorizationGroupCtrl', ['$scope', '$rootScope',
    '$state', 'sysServ', function ($scope, $rootScope, $state, sysServ) {
        $scope.delClick = function () {
            bootbox.confirm("Are you sure?", function (result) {
                if (result) {
                    //
                }
            });
        };
        $scope.add = function () {
            $('#roleDialg').modal({
                keyboard: false
            })
        };
        sysServ.getRole().then(function (res) {
            if (res.data.code == 200) {
                var treeData = res.data.data;
                treeData[0].state = {'opened': true}
                $('#permitTree').jstree({
                    "checkbox": {
                        "keep_selected_style": false
                    },
                    'plugins': ["checkbox"],
                    'core': {
                        "themes": {
                            "responsive": false
                        },
                        'data': treeData
                    },
                    "types": {
                        "default": {
                            "icon": "fa fa-folder icon-state-warning icon-lg"
                        },
                        "file": {
                            "icon": "fa fa-file icon-state-warning icon-lg"
                        }
                    }
                });
            }
        })

        function getChecked() {
            var nodes = $('#permitTree').jstree('get_checked');
            console.log(nodes);
        }

        $scope.save = function () {
            getChecked();
        }
    }]);
mainModule.controller('bankCardAuditCtrl', ['$scope', '$rootScope',
    '$state', 'sysServ', function ($scope, $rootScope, $state, sysServ) {
        $scope.dialogModel = {};
        var $pager = $('#bankCardPagination');
        initPage(1);
        //加载菜单列表数据
        function dataInit(currentPage) {
            //设置请求路径odd  even
            var _url = 'alarm/getAlarmData/paging/' + currentPage + '/' + pageSize;
            $http({
                method: 'post',
                url: _url,
                data: $scope.searchData,
                headers: {'token': $rootScope.token}
            }).success(function (res) {
                if (res.code == 0) {
                    $scope.resDatas = res.data;
                    $scope.sysRole = res.role;
                    var counts = res.data.recordCount; //总共的条数
                    var pageCount = res.data.pageCount > 0 ? res.data.pageCount : 1; //总共的页数
                    initPage(pageCount);
                }
            })
        }

        //bootstrap分页插件
        function initPage(pages) {
            $pager.twbsPagination({
                totalPages: pages,
                visiblePages: 5,
                first: '首页',
                prev: '上一页',
                next: '下一页',
                last: '末页',
                onPageClick: function (event, page) {
                    dataInit(page);
                }
            });
        }

        $scope.selectAll = function (event) {
            //全选
            var action = event.target;
            if (action.checked) {//选中，就添加
                $('.bankCardCheckd').prop("checked", "true");
            } else {//去除就删除result里
                $('.bankCardCheckd').removeAttr("checked");
            }
        };
        $scope.select = function (event) {
            var action = event.target,
                state = true,
                $arry = $('.sysUserCheckd');
            if (action.checked) {//选中，就添加
                for (var i = 0, len = $arry.length; i < len; i++) {
                    if (!$($arry[i]).is(':checked')) {
                        state = false;
                        return;
                    }
                }
                if (state) {
                    $('#bankCardSelectAll').prop("checked", "true");
                }
            } else {//去除就删除result里
                $('#bankCardSelectAll').removeAttr("checked");
            }
        };
        sysServ.getBankCard().then(function (res) {
            //获取初始化数据
            if (res.data.code == 200) {
                $scope.lists = res.data.data;
            }
        });
        var colorbox_params = {
            reposition:true,
            scalePhotos:true,
            scrolling:false,
            previous:'<i class="icon-arrow-left"></i>',
            next:'<i class="icon-arrow-right"></i>',
            close:'&times;',
            current:'{current} of {total}',
            maxWidth:'100%',
            maxHeight:'100%',
            onOpen:function(){
                document.body.style.overflow = 'hidden';
            },
            onClosed:function(){
                document.body.style.overflow = 'auto';
            },
            onComplete:function(){
                $.colorbox.resize();
            }
        };
        $scope.doAction = function (data,type) {
            $scope.dialogModel = data;
            if(type==1){
                //查看
                $scope.lookType = 1;
                $('#dialogCheckReason').prop("readonly","true");
            }else{
                //审核
                $scope.lookType = 2;
                $('#dialogCheckReason').removeAttr("readonly");
            }
            $('#bankCardDialog').modal({
                keyboard: false
            }).on('shown.bs.modal', function (e) {
                $('.ace-thumbnails [data-rel="colorbox"]').colorbox(colorbox_params);
                $("#cboxLoadingGraphic").append("<i class='icon-spinner orange'></i>");
            })
        };
        $scope.startAll = function () {
            if ($(".sysUserCheckd:checked").length != 0) {
                bootbox.confirm("确认通过么?", function (result) {
                    if (!result) {
                    }
                });
            } else {
                bootbox.alert("请先选择数据");
            }
        };
    }]);
mainModule.controller('menuMainCtrl', ['$scope', '$rootScope',
    '$state', 'sysServ', function ($scope, $rootScope, $state, sysServ) {
        $scope.menuModel = {};
        $scope.menuGradeList = [{'value': 1, 'name': '一级菜单'}, {'value': 2, 'name': '二级菜单'}];
        var $pager = $('#menuPagination');
        initPage(1);
        //加载菜单列表数据
        function dataInit(currentPage) {
            //设置请求路径odd  even
            var _url = 'alarm/getAlarmData/paging/' + currentPage + '/' + pageSize;
            $http({
                method: 'post',
                url: _url,
                data: $scope.searchData,
                headers: { 'token': $rootScope.token }
            }).success(function(res) {
                if (res.code == 0) {
                    $scope.resDatas = res.data;
                    $scope.sysRole = res.role;
                    var counts = res.data.recordCount; //总共的条数
                    var pageCount = res.data.pageCount > 0 ? res.data.pageCount : 1; //总共的页数
                    initPage(pageCount);
                }
            })
        }
        //bootstrap分页插件
        function initPage(pages) {
            $pager.twbsPagination({
                totalPages: pages,
                visiblePages: 5,
                first: '首页',
                prev: '上一页',
                next: '下一页',
                last: '末页',
                onPageClick: function(event, page) {
                    dataInit(page);
                }
            });
        }
        $scope.selectAll = function (event) {
            //全选
            var action = event.target;
            if (action.checked) {//选中，就添加
                $('.sysUserCheckd').prop("checked", "true");
            } else {//去除就删除result里
                $('.sysUserCheckd').removeAttr("checked");
            }
        };
        $scope.select = function (event) {
            var action = event.target,
                state = true,
                $arry = $('.sysUserCheckd');
            if (action.checked) {//选中，就添加
                for (var i = 0, len = $arry.length; i < len; i++) {
                    if (!$($arry[i]).is(':checked')) {
                        state = false;
                        return;
                    }
                }
                if (state) {
                    $('#sysUserSelectAll').prop("checked", "true");
                }
            } else {//去除就删除result里
                $('#sysUserSelectAll').removeAttr("checked");
            }
        };
        $scope.saveUser = function () {
            //保存
            console.log($scope.menuModel);
        };
        sysServ.getSysUser().then(function (res) {
            //获取初始化数据
            if (res.data.code == 200) {
                $scope.lists = res.data.data;
            }
        });
        $scope.add = function () {
            $('#addMenuDialog').modal({
                keyboard: false
            }).on('shown.bs.modal', function (e) {
                $("#addMenuForm").validate({
                    errorElement: 'div',
                    errorClass: 'help-block',
                    focusInvalid: false,
                    debug: true,
                    rules: {
                        menuName: {
                            required: true
                        },
                        menuGrade: {
                            required: true
                        },
                        menuFather: {
                            required: true
                        },
                        menuUrl: {
                            required: true
                        },
                    },
                    messages: {
                        menuName: {
                            required: "菜单名称不能为空"
                        },
                        menuGrade: {
                            required: "菜单等级不能为空"
                        },
                        menuFather: {
                            required: "上级菜单不能为空"
                        },
                        menuUrl: {
                            required: "菜单路径不能为空"
                        }
                    },
                    highlight: function (e) {
                        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
                    },
                    submitHandler: function (form) {
                        //call请求回调
                        $http({
                            method: 'post',
                            url: 'alarm/saveAllocation',
                            data: {'id': $scope.allocationD.id, 'refuseUserId': $scope.allocationD.refuseUserId},
                            headers: {'token': $rootScope.token}
                        }).success(function (res) {
                            if (res.code == 0) {
                                $('#allocationModal').modal('hide');
                                $scope.allocationData = res.data;
                                $pager.empty();
                                $pager.removeData("twbs-pagination");
                                $pager.unbind("page");
                                dataInit(1);
                            }
                        })
                    }
                });
            })
        };
        $scope.edit = function (data) {
            $scope.menuModel = data;
            $('#addMenuDialog').modal({
                keyboard: false
            })
        };
        $scope.del = function () {
            bootbox.confirm("确认删除么?", function (result) {
                if (result) {
                    //
                }
            });
        };
        $scope.startAll = function () {
            if ($(".sysUserCheckd:checked").length != 0) {
                bootbox.confirm("确认启用么?", function (result) {
                    if (!result) {
                    }
                });
            } else {
                bootbox.alert("请先选择数据");
            }
        };
        $scope.stopAll = function () {
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
        $scope.start = function () {
            bootbox.confirm("确认启用么?", function (result) {
                if (result) {
                    //
                }
            });
        };
        $scope.stop = function () {
            bootbox.confirm("确认禁用么?", function (result) {
                if (result) {
                    //
                }
            });
        };

    }]);
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