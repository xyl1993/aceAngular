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