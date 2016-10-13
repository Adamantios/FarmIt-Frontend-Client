/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.provider', [])

    .controller('ProviderCtrl', function ($scope, $state, $stateParams, $window, $ionicPopup, $ionicModal,
                                          GetProvidersService, NetworkHelperService, PurchasesService) {
      $scope.provider = null;
      $scope.product = null;
      $scope.products = [];
      $scope.fromSearch = $stateParams.fromSearch;
      $scope.productToAdd = null;
      $scope.cartProducts = [];
      $scope.shipping = 0;
      $scope.additional = 0;
      $scope.totalPrice = 0;
      $scope.stillSearching = false;
      $scope.isSpinning = false;

      $scope.initializeView = function () {
        if ($window.localStorage.getItem('cart'))
          $scope.cartProducts = JSON.parse($window.localStorage.getItem('cart'));

        if ($scope.fromSearch) {
          $scope.provider = $stateParams.provider;
          $scope.product = $stateParams.product;
        }
        else {
          $scope.provider = $stateParams.provider;
          $scope.getProducts();
        }
      };

      $scope.getAllProducts = function () {
        $scope.fromSearch = false;
        $scope.getProducts();
      };

      $scope.getProducts = function () {
        if (!NetworkHelperService.isConnected()) {
          $scope.stillSearching = true;
          $scope.isSpinning = true;
          GetProvidersService.getProducts($scope.provider.email).then(function ($success) {
              $scope.stillSearching = false;
              $scope.products.push($success.data.data);
              $scope.isSpinning = false;
            },
            function () {
              $scope.stillSearching = false;
              $scope.isSpinning = false;
            })
        }
        else {
          // Alert dialog
          $ionicPopup.alert({
            title: 'No internet connection!',
            template: 'Internet connection is required for this action!'
          });
        }
      };

      $scope.addToCart = function ($id, $name, $unitPrice, $shippingCost, $additionalShipping, $providerName) {
        $scope.popup = {};
        $scope.popup.quantity = 0.5;
        $scope.popup.price = $unitPrice;
        var popup = $ionicPopup.show({
          templateUrl: 'templates/add-to-cart.html',
          title: $name,
          subTitle: 'Please enter quantity',
          scope: $scope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Add To Cart</b>',
              type: 'button-positive',
              onTap: function (e) {
                if (!$scope.popup.quantity) {
                  // Don't allow the user to close unless he enters quantity.
                  e.preventDefault();
                }
                else {
                  $scope.productToAdd =
                  {
                    'id': $id,
                    'name': $name,
                    'quantity': $scope.popup.quantity,
                    'price': $scope.popup.price * $scope.popup.quantity,
                    'shipping': $shippingCost,
                    'additional': $additionalShipping,
                    'providerName': $providerName
                  };

                  return true;
                }
              }
            }
          ]
        });

        popup.then(function (ok) {
          if (ok) {
            $scope.cartProducts.push($scope.productToAdd);
            $window.localStorage.setItem('cart', JSON.stringify($scope.cartProducts));
          }
        });
      };

      $ionicModal.fromTemplateUrl('templates/cart.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $scope.openCart = function () {
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
              $scope.shipping = 0;
              $scope.additional = 0;
              $scope.totalPrice = 0;
              $scope.cartProducts = [];
              $window.localStorage.setItem('cart', $scope.cartProducts);
              $scope.isSpinning = false;
              $ionicPopup.alert({
                title: 'Excellent choice!',
                template: 'Your request has been sent to our partner provider(s) ' +
                'and he is going to contact you soon for more details! ' +
                'In the mean time...Farmit some more!'
              });
              $scope.modal.hide();
              $state.go('home.menu-content');
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

      $scope.initializeView();
    })
})();
