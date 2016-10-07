/**
 * Created by Manos on 26/4/2016.
 */
(function () {

  angular.module('app.services.signup', [])

    .factory('SignUpService', function ($http) {
      var $connectionString = "http://localhost:8080/farmit/";

      /*Does not work!
       *
       return {
       signUp: function ($name, $surname, $email, $password, $tel) {
       $http.post($connectionString + 'api/users/register',
       {
       'name': $name,
       'surname': $surname,
       'email': $email,
       'password': $password,
       'tel_num': $tel,
       'is_company': 1
       })
       .then(function ($returnedData) {
       return $returnedData;
       }, function ($returnedData) {
       return $returnedData;
       });
       }
       };*/

      return {
        signUp: function ($name, $surname, $email, $password, $tel) {
          return $http({
            method: 'POST',
            url: $connectionString + 'api/users/register',
            data:
            "name=" + $name +
            "&surname=" + $surname +
            "&email=" + $email +
            "&password=" + $password +
            "&tel_num=" + $tel +
            "&is_company=" + false,
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
