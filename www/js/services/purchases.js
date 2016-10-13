(function () {

  angular.module('app.services.purchases', [])

    .factory('PurchasesService', function ($http, $rootScope, $window) {

      return {
        upload: function ($products, $total_price) {
          //noinspection SpellCheckingInspection
          var $url = $rootScope.server + 'api/instantpurchases/create_instant_purchase';

          var $parameters =
          {
            "products": $products,
            "total_price": $total_price,
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
