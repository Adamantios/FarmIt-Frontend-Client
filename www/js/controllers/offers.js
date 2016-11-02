(function () {

  angular.module('app.controllers.offers', [])
    .controller('OffersCtrl', function ($scope, $state, $ionicPopup, $interval, OffersService) {
      $scope.userOffers = {};
      $scope.userOffers.offers = [];
      $scope.userOffers.isSpinning = false;

      $scope.loadOffers = function () {
        $scope.userOffers.isSpinning = true;
        OffersService.getOffers().then(function ($success) {
            $scope.userOffers.isSpinning = false;
            $scope.userOffers.offers = $success.data.data;
          },
          function () {
            $scope.userOffers.isSpinning = false;
          });
      };

      $scope.chooseOffer = function ($id) {
        var $popup = $ionicPopup.show({
          title: 'Accept Offer',
          template: 'Would you like to accept this offer?',
          buttons: [
            {
              text: 'Yes',
              type: 'button-positive',
              onTap: function () {
                $scope.acceptOffer($popup, $id);
              }
            },
            {
              text: 'No'
            }
          ]
        })
      };

      $scope.acceptOffer = function ($popup, $id) {
        $popup.close();

        OffersService.acceptOffer($id).then(function () {
            $scope.loadOffers();
            $ionicPopup.alert({
              title: 'Excellent choice!',
              template: 'An email with your purchase details has been sent to your account.' +
              ' In the mean time... Farmit some more!'
            });
          },
          function () {
            $ionicPopup.alert({
              title: 'Offer not accepted!',
              template: 'Something went wrong while trying to accept this offer. Please try again later.'
            });
          });
      };

      $scope.doRefresh = function() {
        $scope.loadOffers();
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      };

      $scope.loadOffers();

      // Refresh offers every minute.
      $interval(function () {
        $scope.loadOffers();
      }, 60 * 1000);
    })
})();
