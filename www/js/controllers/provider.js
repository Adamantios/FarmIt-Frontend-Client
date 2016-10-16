/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.provider', [])

    .controller('ProviderCtrl', function ($scope, $state, $stateParams, $window, $ionicPopup, $ionicModal,
                                          GetProvidersService, PurchasesService, CartHelperService) {
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
        $scope.cartProducts = CartHelperService.initializeCart();

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
                $scope.isSpinning = true;

                var $results = CartHelperService.purchase($scope.modal, $scope.cartProducts, $scope.totalPrice);

                $scope.cartProducts = $results.cartProducts;
                $scope.totalPrice = $results.totalPrice;

                if (!$results.failed) {
                  $scope.shipping = 0;
                  $scope.additional = 0;
                }

                $scope.isSpinning = false;
              }
            }
          ]
        });
      };

      $scope.initializeView();
    })
})();
