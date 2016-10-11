/**
 * Created by Manos on 26/4/2016.
 */
(function () {

  angular.module('app.services.providers', [])

    .factory('GetProvidersService', function ($http, $rootScope) {
      return {
        getProviders: function ($start) {
          var $url = $rootScope.server + 'api/users/get_producers';

          var $parameter = {'start': $start};

          return $http.post($url, $parameter)
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        },

        getResults: function ($match, $start) {
          var $url = $rootScope.server + 'api/products/search_products_producers';

          var $parameters =
          {
            'start': $start,
            'match': $match
          };

          return $http.post($url, $parameters)
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        }
      };
    })

})();
