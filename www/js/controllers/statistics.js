/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.statistics', [])

    .controller('StatisticsCtrl', function ($scope, StatisticsService) {
      $scope.announcementsCreated = 0;
      $scope.offersAccepted = 0;
      $scope.offersReceived = 0;
      $scope.instantPurchases = 0;
      $scope.isSpinning = true;
      $scope.fetchError = false;

      StatisticsService.getStatistics().then(function ($success) {
          $scope.isSpinning = false;
          $scope.announcementsCreated = $success.data.announcements_created;
          $scope.offersAccepted = $success.data.offers_accepted;
          $scope.offersReceived = $success.data.offers_received;
          $scope.instantPurchases = $success.data.instant_purchases;
        },
        function () {
          $scope.isSpinning = false;
          $scope.fetchError = true;
        })
    })
})();
