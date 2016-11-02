/**
 * Created by Manos on 26/4/2016.
 */
(function () {

  angular.module('app.services.providers', [])

    .factory('GetProvidersService', function ($http, SERVER) {
      return {
        getProviders: function ($start) {
          var $url = SERVER.url + 'api/users/get_producers';

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
          var $url = SERVER.url + 'api/products/search_products_producers';

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
        },

        getProducts: function ($email) {
          var $url = SERVER.url + 'api/products/get_products_by_producer_email';
          var $parameter = {'email': $email};

          return $http.post($url, $parameter)
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
