(function () {

  angular.module('app.services.announcements', [])

    .factory('AnnouncementService', function ($http, $window, SERVER) {

      return {
        upload: function ($announcement, $final_price, $duration) {
          var $url = SERVER.url + 'api/announcements/upload';

          var $parameters =
          {
            "announcement": $announcement,
            "final_price": $final_price,
            "duration": $duration,
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
