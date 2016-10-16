(function () {

  angular.module('app.controllers.cart', [])

    .controller('CartCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, CartHelperService) {
      $scope.cartProducts = CartHelperService.initializeCart();
      $scope.totalPrice = 0;
      $scope.isSpinning = false;

      $ionicModal.fromTemplateUrl('templates/cart.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });


      $scope.openCart = function () {
        $scope.cartProducts = CartHelperService.initializeCart();

        var $results = CartHelperService.openCart($scope.modal, $scope.cartProducts);

        $scope.shipping = $results.shipping;
        $scope.additional = $results.additional;
        $scope.totalPrice = $results.totalPrice;
      };

      $scope.deleteProduct = function ($index) {
        var $results = CartHelperService.deleteProduct($index, $scope.modal, $scope.cartProducts, $scope.totalPrice);

        $scope.cartProducts = $results.cartProducts;
        $scope.shipping = $results.shipping;
        $scope.additional = $results.additional;
        $scope.totalPrice = $results.totalPrice;
      };

      $scope.buy = function () {
        // Confirm dialog
        $ionicPopup.show({
          title: 'Purchase products',
          template: 'Are you sure that you want to make this purchase?',
          buttons: [
            {
              text: "No"
            },
            {
              text: "Yes",
              type: 'button-positive',
              onTap: function () {
                alert('ok');
                $scope.isSpinning = true;

                var $results = CartHelperService.purchase($scope.modal, $scope.cartProducts, $scope.totalPrice);

                $scope.cartProducts = $results.cartProducts;
                $scope.totalPrice = $results.totalPrice;
                $scope.isSpinning = false;
              }
            }
          ]
        });
      };
    })
})();
