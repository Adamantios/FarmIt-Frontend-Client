/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.controllers.logout', [])

    .controller('LogOutCtrl', function ($scope, $ionicPopup, $state, $window) {

      $scope.logOut = function () {
        // Confirm dialog
        var confirmPopup = $ionicPopup.confirm({
          title: 'Log Out',
          template: 'Are you sure you want to log out?'
        });

        confirmPopup.then(function ($ok) {
          if ($ok) {
            $state.go('home.menu-content');
            $window.localStorage.setItem('remember_me', false);
            $window.localStorage.setItem('token', null);
            $window.localStorage.setItem('email', null);
            $state.go('farmit');
          }
        });
      };
    })
})();
