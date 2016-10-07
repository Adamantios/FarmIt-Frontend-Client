/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.home', ['ng-mfb'])

    .controller('HomeCtrl', function ($scope, $ionicSideMenuDelegate) {
      
      $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })

    .controller('HomeMenuCtrl', function ($scope, $state) {
      $scope.createAnnouncement = function () {
        $state.go('announcement');
      };
      
    })

})();
