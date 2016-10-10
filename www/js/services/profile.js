/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.services.profile', [])

    .factory('DeleteProfileService', function ($http, $window, $rootScope) {
      return {
        deleteProfile: function ($email, $password) {
          var $url = $rootScope.server + 'api/users/delete';

          var $parameters =
          {
            "email": $email,
            "password": $password,
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
