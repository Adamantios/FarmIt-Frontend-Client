/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.services.profile', [])

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
        },

        logInBackstage: function ($email, $token) {
          var $url = $rootScope.server + 'api/users/backstage_login';

          var $parameter =
          {
            "email": $email,
            'token': $token
          };

          return $http.post($url, $parameter)
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        }
      };

    })

    .factory('LogOutService', function ($http, $rootScope) {
      return {
        logOut: function ($email) {
          var $url = $rootScope.server + 'api/users/delete_token';

          var $parameter = {"email": $email};

          return $http.post($url, $parameter)
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        }
      };

    })

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

    .factory('ProfileService', function ($http, $window, $rootScope) {
      return {
        getProfile: function () {
          var $url = $rootScope.server + 'api/users/get_user';

          var $parameters =
          {
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

        updateProfile: function ($id, $name, $surname, $email, $tel) {
          var $url = $rootScope.server + 'api/users/update_user';

          var $data =
          {
            "id": $id,
            "name": $name,
            "surname": $surname,
            "email": $email,
            "tel_num": $tel

          };

          var $parameters =
          {
            "data": $data,
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
