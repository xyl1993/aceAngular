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