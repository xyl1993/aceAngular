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