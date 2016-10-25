(function () {

  angular.module('app.controllers.offers', [])
    .controller('OffersCtrl', function ($scope, $ionicPopup, OffersService) {
      $scope.userOffers = {};
      $scope.userOffers.offers = [];
      $scope.userOffers.isSpinning = true;

      OffersService.getOffers().then(function ($success) {
          $scope.userOffers.isSpinning = false;
          $scope.userOffers.offers = $success.data.data;
        },
        function () {
          $scope.userOffers.isSpinning = false;
        });

      $scope.chooseOffer = function () {
        $ionicPopup.show({
          title: 'Accept Offer',
          template: 'Would you like to accept this offer?',
          buttons:[
            {
              text:'Yes',
              type:'button-positive',
              onTap: function () {

              }
            }
          ]
        })
      }
    })
})();
