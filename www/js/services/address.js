/**
 * Created by Manos on 28/4/2016.
 */
(function () {

  angular.module('app.services.address', [])

    .factory('AddressService', function ($http, $window) {
      var $connectionString = "http://localhost:8080/farmit/";

      return {
        createAddress: function ($street, $number, $area, $zip, $tel) {
          return $http({
            method: 'POST',
            url: $connectionString + 'api/addresses/insert',
            data: "email=" + $window.localStorage.getItem('email') +
            "&street=" + $street +
            "&number=" + $number +
            "&area=" + $area +
            "&zip_code=" + $zip +
            "&tel_num=" + $tel +
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
