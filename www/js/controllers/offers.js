(function () {

  angular.module('app.controllers.offers', [])
    .controller('OffersCtrl', function ($scope, OffersService) {
      $scope.userOffers = {};
      $scope.userOffers.offers = [];
      $scope.userOffers.isSpinning = false;

      OffersService.getOffers().then(function ($success) {
        $scope.userOffers.offers = $success.data.data;
      },
      function ($error) {

      });
    })
})();
