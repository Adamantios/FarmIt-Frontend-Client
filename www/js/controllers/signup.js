/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.signup', [])

    .controller('SignUpCtrl', function ($scope, $window, $ionicPopup, $state, SignUpService, NetworkHelperService) {

      $scope.isSpinning = false;
      $scope.isChecked = false;

      $scope.farmIn = function ($name, $surname, $email, $password, $tel) {
        if (NetworkHelperService.isConnected()) {
          $scope.isSpinning = true;

          SignUpService.signUp($name, $surname, $email, $password, $tel).then(function ($success) {
            $window.localStorage.setItem('remember_me', $scope.isChecked);
            $window.localStorage.setItem('token', $success.data.token);
            $window.localStorage.setItem('email', $success.data.session.email);
            $scope.isSpinning = false;
            $state.go('first-address');
          }, function () {
            $scope.isSpinning = false;

            // Alert dialog
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Something went wrong while trying to signup! Please try again!'
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
