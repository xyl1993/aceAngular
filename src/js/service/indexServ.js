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
