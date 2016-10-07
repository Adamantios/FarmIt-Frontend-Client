/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.signup', [])

    .controller('SignUpCtrl', function ($scope, $window, $ionicPopup, $state, SignUpService, NetworkHelperService) {

      $scope.isSpinning = false;
      var $remember_me = false;

      $scope.updateLocalStorage = function ($option) {
        $remember_me = $option;
      };

      $scope.farmIn = function ($name, $surname, $email, $password, $tel) {
        if (NetworkHelperService.isConnected()) {
          $scope.isSpinning = true;

          SignUpService.signUp($name, $surname, $email, $password, $tel).then(function ($success) {
            $window.localStorage.setItem('remember_me', $remember_me);
            $window.localStorage.setItem('token', $success.data.token);
            $window.localStorage.setItem('email', $success.data.session.email);
            $scope.isSpinning = false;
            $state.go('first-address');
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
      };
    })
})();
