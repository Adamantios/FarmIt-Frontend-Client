/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.services.profile', [])

    .factory('DeleteProfileService', function ($http, $window) {
      var $connectionString = "http://localhost:8080/farmit/";

      return {
        deleteProfile: function ($email, $password) {
          return $http({
            method: 'POST',
            url: $connectionString + 'api/users/delete',
            data:
            "email=" + $email +
            "&password=" + $password +
            "&token=" + $window.localStorage.getItem('token'),
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
