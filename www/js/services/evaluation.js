(function () {

  angular.module('app.services.evaluation', [])

    .factory('EvaluationService', function ($http, $window, SERVER) {
      return {
        evaluate: function ($id) {
          var $url = SERVER.url + 'api/users/evaluate';

          var $parameters =
          {
            "id": $id,
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
        },

        can_be_evaluated: function ($id) {
          var $url = SERVER.url + 'api/users/can_be_evaluated';

          var $parameters =
          {
            "id": $id,
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
