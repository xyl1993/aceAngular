mainModule.factory('appServ', ['$http',
    function($http) {
        var serv = {
            getVersionDatas: function() {
                return $http({
                    method: 'get',
                    url: 'src/data/role.json'
                })
            },
            getAnnounceDatas: function() {
                return $http({
                    method: 'get',
                    url: 'src/data/role.json'
                })
            }
        };
        return serv;
    }
]);
