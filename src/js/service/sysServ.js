mainModule.factory('sysServ', ['$http',
    function($http) {
        var serv = {
            getRole: function() {
                return $http({
                    method: 'get',
                    url: 'src/data/role.json'
                })
            },
            getSysUser: function() {
                return $http({
                    method: 'get',
                    url: 'src/data/sysUser.json'
                })
            },
            getBankCard: function() {
                return $http({
                    method: 'get',
                    url: 'src/data/bankCardAudit.json'
                })
            }
        };
        return serv;
    }
]);
