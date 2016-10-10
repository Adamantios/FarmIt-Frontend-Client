/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.login', [])

    .controller('LogInCtrl', function ($scope, $window, $ionicPopup, $state, LogInService, NetworkHelperService) {
      $scope.isSpinning = false;
      $scope.login = {'isChecked': false};

      $scope.farmIn = function ($email, $password) {
        if (!NetworkHelperService.isConnected()) {
          $scope.isSpinning = true;

          LogInService.logIn($email, $password).then(function ($success) {
            $window.localStorage.setItem('remember_me', $scope.login['isChecked']);
            $window.localStorage.setItem('token', $success.data.token);
            $window.localStorage.setItem('email', $success.data.session.email);
            $scope.isSpinning = false;
            $state.go('home.menu-content');
          }, function () {
            $scope.isSpinning = false;

            // Alert dialog
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Something went wrong while trying to login! Please try again!'
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
