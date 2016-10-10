/**
 * Created by Manos on 26/4/2016.
 */
(function () {

  angular.module('app.services.login', [])

    .factory('LogInService', function ($http, $rootScope) {
      return {
        logIn: function ($email, $password) {
          var $url = $rootScope.server + 'api/users/login';

          var $parameters =
          {
            "email": $email,
            "password": $password
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
