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

    .controller('HomeMenuCtrl', function ($scope, $state, $ionicScrollDelegate, $interval, $ionicPopover,
                                          GetProvidersService) {
      $scope.isSpinning = false;
      $scope.start = 0;
      $scope.searchStart = 0;
      $scope.providers = [];
      $scope.resultsProviders = [];
      $scope.resultsProvidersMatched = [];
      $scope.resultsProducts = [];
      $scope.moreDataCanBeLoaded = true;
      $scope.moreResultsCanBeLoaded = false;
      $scope.home = {};
      $scope.home.searchField = null;
      $scope.stillSearching = false;

      $scope.offersNotifications = [];
      $scope.messagesNotifications = [];

      $ionicPopover.fromTemplateUrl('templates/notifications-popover.html', {
        scope: $scope
      }).then(function (popover) {
        $scope.popover = popover;
      });

      $scope.openNotifications = function ($event) {
        $scope.popover.show($event);
      };

      $scope.pokeProgressRing = function () {
        $scope.isSpinning = !($scope.resultsProviders && $scope.resultsProducts && $scope.resultsProvidersMatched
        && !$scope.home.searchField && $scope.moreResultsCanBeLoaded);
      };

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

              // Reset value after one minute.
              $interval(function () {
                $scope.moreDataCanBeLoaded = true;
              }, 1000 * 60);
            });

        $scope.$broadcast('scroll.infiniteScrollComplete');
      };

      $scope.userHasScrolledABit = function () {
        return $ionicScrollDelegate.$getByHandle('mainScroll').getScrollPosition().top;
      };

      $scope.search = function () {
        $scope.stillSearching = true;
        $scope.resultsProviders = [];
        $scope.resultsProducts = [];
        $scope.resultsProvidersMatched = [];
        $scope.searchStart = 0;
        $scope.moreResultsCanBeLoaded = true;
        $scope.loadMoreResults();
      };

      $scope.loadMoreResults = function () {
        $scope.pokeProgressRing();
        $scope.moreResultsCanBeLoaded = false;
        GetProvidersService.getResults($scope.home.searchField, $scope.searchStart)
          .then(function ($success) {
              $scope.stillSearching = false;
              $scope.searchStart += $success.data.data.products.length;
              $scope.resultsProviders.push($success.data.data.producers);
              $scope.resultsProvidersMatched.push($success.data.data.producers_matched);
              $scope.resultsProducts.push($success.data.data.products);
              $scope.moreResultsCanBeLoaded = true;
            },
            function () {
              $scope.stillSearching = false;
              $scope.moreResultsCanBeLoaded = false;
              $scope.isSpinning = false;

              // Reset value after one minute.
              $interval(function () {
                $scope.moreResultsCanBeLoaded = true;
              }, 1000 * 60);
            });

        $scope.$broadcast('scroll.infiniteScrollComplete');
      };

      $scope.$on('$stateChangeSuccess', function () {
        $scope.loadMoreData();
        $scope.loadMoreResults();
      });

      $scope.scrollToTop = function () {
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(true);
      };

      $scope.createAnnouncement = function () {
        $state.go('announcement');
      };

      $scope.redirect = function ($provider) {
        var $parameters =
        {
          'provider': $provider,
          'fromSearch': false
        };

        $state.go('provider', $parameters);
      };

      $scope.searchRedirect = function ($provider, $product) {
        var $parameters =
        {
          'provider': $provider,
          'product': $product,
          'fromSearch': true
        };

        $state.go('provider', $parameters);
      };
    })

})();
