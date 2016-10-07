/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.login', [])

    .controller('LogInCtrl', function ($scope, $window, $ionicPopup, $state, LogInService, NetworkHelperService) {

      $scope.isSpinning = false;
      var $remember_me = false;

      $scope.updateLocalStorage = function ($option) {
        $remember_me = $option;
      };

      $scope.farmIn = function ($email, $password) {
        if (NetworkHelperService.isConnected()) {
          $scope.isSpinning = true;

          LogInService.logIn($email, $password).then(function ($success) {
            $window.localStorage.setItem('remember_me', $remember_me);
            $window.localStorage.setItem('token', $success.data.token);
            $window.localStorage.setItem('email', $success.data.session.email);
            $scope.isSpinning = false;
            $state.go('home.menu-content');
          }, function ($error) {
            $scope.isSpinning = false;

            // Alert dialog
            $ionicPopup.alert({
              title: 'Error!',
              template: $error.data.message
            });
          });
        }
        else {
          // Alert dialog
          $ionicPopup.alert({
            title: 'No internet connection!',
            template: 'Internet connection is required for this action!'
          });
        }
      }
    })
})();
