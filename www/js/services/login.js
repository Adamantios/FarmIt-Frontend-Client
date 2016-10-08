/**
 * Created by Manos on 26/4/2016.
 */
(function () {

  angular.module('app.services.login', [])

    .factory('LogInService', function ($http, $rootScope) {
      /*Does not work!
       *
       return {
       logIn: function ($email, $password) {
       $http.post($rootScope.server + 'api/users/login',
       {
       'email': $email,
       'password': $password,
       })
       .then(function ($returnedData) {
       return $returnedData;
       }, function ($returnedData) {
       return $returnedData;
       });
       }
       };*/

      return {
        logIn: function ($email, $password) {
          return $http({
            method: 'POST',
            url: $rootScope.server + 'api/users/login',
            data:
            "email=" + $email +
            "&password=" + $password,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
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
