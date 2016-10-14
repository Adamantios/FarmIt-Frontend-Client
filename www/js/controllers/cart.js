(function () {

  angular.module('app.controllers.cart', [])

    .controller('CartCtrl', function ($scope, $stateParams, $ionicModal, CartHelperService) {
      $scope.cartProducts = [];
      $scope.totalPrice = 0;
      $scope.isSpinning = false;

      $scope.cartProducts = CartHelperService.initializeCart();

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
        $scope.isSpinning = true;

        var $results = CartHelperService.buy($scope.modal, $scope.cartProducts, $scope.totalPrice);

        $scope.cartProducts = $results.cartProducts;
        $scope.totalPrice = $results.totalPrice;
        $scope.isSpinning = false;
      };
    })
})();
