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
