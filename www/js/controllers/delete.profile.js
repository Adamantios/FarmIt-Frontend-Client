/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.controllers.delete.profile', [])

    .controller('DeleteProfileCtrl', function ($scope, $state, $ionicPopup, $window, $ionicSideMenuDelegate,
                                               DeleteProfileService) {

      $scope.isSpinning = false;

      $scope.goodbye = function ($email, $password) {
        $scope.isSpinning = true;

        if ($email == $window.localStorage.getItem('email')) {
          DeleteProfileService.deleteProfile($email, $password).then(function () {
              $ionicSideMenuDelegate.toggleLeft();
              $window.localStorage.setItem('remember_me', false);
              $window.localStorage.setItem('token', null);
              $window.localStorage.setItem('email', null);
              $scope.isSpinning = false;
              $state.go('farmit');
            },
            function () {
              $scope.isSpinning = false;
              // Alert dialog
              $ionicPopup.alert({
                title: 'Error!',
                template: 'Something went wrong while trying to delete your profile! Please try again!'
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
    })
})();
