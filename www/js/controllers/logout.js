/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.controllers.logout', [])

    .controller('LogOutCtrl', function ($scope, $ionicPopup, $state, $window, $ionicSideMenuDelegate, LogOutService) {
      $scope.logOut = function () {
        // Confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'Log Out',
          template: 'Are you sure you want to log out?'
        });

        confirmPopup.then(function ($ok) {
          if ($ok) {
            LogOutService.logOut($window.localStorage.getItem('email')).then(function () {
              $ionicSideMenuDelegate.toggleLeft();
              $window.localStorage.setItem('remember_me', false);
              $window.localStorage.setItem('token', null);
              $window.localStorage.setItem('email', null);
              $scope.isSpinning = false;
              $state.go('farmit');
            }, function () {
              // Alert dialog
              $ionicPopup.alert({
                title: 'Error!',
                template: 'Something went wrong while trying to log out! Please try again!'
              });
            });
          }
        });
      };
    })
})();
