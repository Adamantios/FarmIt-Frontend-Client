/**
 * Created by Manos on 28/4/2016.
 */
(function () {

  angular.module('app.services.address', [])

    .factory('AddressService', function ($http, $window, $rootScope) {
      return {
        createAddress: function ($alias, $street, $number, $area, $zip, $tel) {
          var $url = $rootScope.server + 'api/addresses/insert';

          var $parameters =
          {
            "email": $window.localStorage.getItem('email'),
            "alias": $alias,
            "street": $street,
            "number": $number,
            "area": $area,
            "zip_code": $zip,
            "tel_num": $tel,
            "token": $window.localStorage.getItem('token')
          };

          return $http.post($url, $parameters)
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        },

        getAddresses: function () {
          var $url = $rootScope.server + 'api/addresses/get_addresses';

          var $parameters =
          {
            "email": $window.localStorage.getItem('email'),
            "token": $window.localStorage.getItem('token')
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
