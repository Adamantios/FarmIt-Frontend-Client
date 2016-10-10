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

    .controller('HomeMenuCtrl', function ($scope, $state, $ionicScrollDelegate, GetProvidersService) {
      $scope.start = 0;
      $scope.providers = [];
      $scope.moreDataCanBeLoaded = true;

      $scope.loadMoreData = function () {
        $scope.moreDataCanBeLoaded = false;
        GetProvidersService.getProviders($scope.start)
          .then(function ($success) {
              $scope.start += $success.data.data.length;
              $scope.providers.push($success.data.data);
              $scope.moreDataCanBeLoaded = true;
            },
            function () {
              $scope.moreDataCanBeLoaded = false;
            });

        $scope.$broadcast('scroll.infiniteScrollComplete');
      };

      $scope.$on('$stateChangeSuccess', function () {
        $scope.loadMoreData();
      });

      $scope.scrollToTop = function () {
        $ionicScrollDelegate.$getByHandle('small').scrollTop();
      };

      $scope.createAnnouncement = function () {
        $state.go('announcement');
      };
    })

})();
