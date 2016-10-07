/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.controllers.delete.profile', [])

    .controller('DeleteProfileCtrl', function ($scope, $state, $ionicPopup, $window, DeleteProfileService,
                                               NetworkHelperService) {

      $scope.isSpinning = false;

      $scope.goodbye = function ($email, $password) {
        if (NetworkHelperService.isConnected()) {
          $scope.isSpinning = true;

          if ($email == $window.localStorage.getItem('email')) {
            DeleteProfileService.deleteProfile($email, $password).then(function () {
                $window.localStorage.setItem('remember_me', false);
                $window.localStorage.setItem('token', null);
                $window.localStorage.setItem('email', null);
                $scope.isSpinning = false;
                $state.go('farmit');
              },
              function ($error) {
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
              title: 'Wrong email!',
              template: 'This is not the email you are signed in with!'
            });
          }
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
