/**
 * Created by Manos on 26/4/2016.
 */
(function () {

  angular.module('app.services.signup', [])

    .factory('SignUpService', function ($http, $rootScope) {
      return {
        signUp: function ($name, $surname, $email, $password, $tel) {
          var $url = $rootScope.server + 'api/users/register';

          var $parameters =
          {
            "name": $name,
            "surname": $surname,
            "email": $email,
            "password": $password,
            "tel_num": $tel,
            "is_company": false
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
