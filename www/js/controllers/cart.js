(function () {

  angular.module('app.controllers.cart', [])

    .controller('CartCtrl', function ($scope, $state, $stateParams, $window, $ionicPopup, $ionicModal,
                                          GetProvidersService, NetworkHelperService, PurchasesService) {
      $scope.cartProducts = [];
      $scope.totalPrice = 0;
      $scope.isSpinning = false;

      $scope.initializeCart = function () {
        if ($window.localStorage.getItem('cart'))
          $scope.cartProducts = JSON.parse($window.localStorage.getItem('cart'));
      };

      $ionicModal.fromTemplateUrl('templates/cart.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $scope.openCart = function () {
        $scope.initializeCart();
        $scope.modal.show();
        $scope.totalPrice = 0;
        $scope.shipping = 0;
        $scope.additional = 0;
        var $distinctProductInCart = [];

        angular.forEach($scope.cartProducts, function (product) {
          $scope.totalPrice += parseFloat(product.price);

          if ($distinctProductInCart.indexOf(product.id) == -1) {
            $distinctProductInCart.push(product.id);
            var $extraShipping = parseFloat(product.shipping);
            var $extraAdditional = parseFloat(product.additional);
            $scope.shipping += $extraShipping;
            $scope.additional += $extraAdditional;
            $scope.totalPrice += $extraShipping + $extraAdditional;
          }
        });
      };

      $scope.deleteProduct = function ($index) {
        var $distinctProductInCart = [];
        var $productToRemove = $scope.cartProducts[$index].id;
        var $shipping = $scope.cartProducts[$index].shipping;
        var $additional = $scope.cartProducts[$index].additional;

        $scope.totalPrice -= parseFloat($scope.cartProducts[$index].price);
        $scope.cartProducts.splice($index, 1);

        angular.forEach($scope.cartProducts, function (product) {
          if ($distinctProductInCart.indexOf(product.id) == -1)
            $distinctProductInCart.push(product.id);
        });

        if ($distinctProductInCart.indexOf($productToRemove) == -1) {
          var $removingShipping = parseFloat($shipping);
          var $removingAdditional = parseFloat($additional);
          $scope.shipping -= $removingShipping;
          $scope.additional -= $removingAdditional;
          $scope.totalPrice -= $removingShipping + $removingAdditional;
        }

        if ($scope.cartProducts.length == 0)
          $scope.modal.hide();

        $window.localStorage.setItem('cart', JSON.stringify($scope.cartProducts));
      };

      $scope.buy = function () {
        if (!NetworkHelperService.isConnected()) {
          $scope.isSpinning = true;

          PurchasesService.upload($scope.cartProducts, $scope.totalPrice).then(function () {
              $scope.totalPrice = 0;
              $scope.cartProducts = [];
              $window.localStorage.setItem('cart', $scope.cartProducts);
              $scope.isSpinning = false;
              $scope.modal.hide();
              $state.go('home.menu-content');
              $ionicPopup.alert({
                title: 'Excellent choice!',
                template: 'Your request has been sent to our partner provider(s) ' +
                'and he is going to contact you soon for more details! ' +
                'In the mean time... Farmit some more!'
              });
            },
            function () {
              $scope.isSpinning = false;
              // Alert dialog
              $ionicPopup.alert({
                title: 'Error!',
                template: 'Something went wrong while trying to complete your purchase! Please try again!'
              });
            });
        }

        else {
          // Alert dialog
          $ionicPopup.alert({
            title: 'No internet connection!',
            template: 'Internet connection is required for this action!'
          });
        }
      };
    })
})();
