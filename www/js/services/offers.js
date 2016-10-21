(function () {

  angular.module('app.services.offers', [])

    .factory('OffersService', function ($rootScope, $window, $http) {
      return {
        getOffers: function () {
          var $url = $rootScope.server + 'api/offers/get_offers';

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
