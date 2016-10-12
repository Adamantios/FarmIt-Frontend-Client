/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.provider', [])

    .controller('ProviderCtrl', function ($scope, $stateParams, $window, $ionicPopup, GetProvidersService) {
      $scope.provider = null;
      $scope.product = null;
      $scope.products = [];
      $scope.fromSearch = $stateParams.fromSearch;
      $scope.quantity = 0.5;
      $scope.cartProducts = [];
      $scope.stillSearching = false;
      $scope.isSpinning = false;

      $scope.initializeView = function () {
        if (JSON.parse($window.localStorage.getItem('cart')))
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

      $scope.addToCart = function ($id, $name, $price) {
        $scope.price = $price;
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
                if (!$scope.quantity) {
                  // Don't allow the user to close unless he enters quantity.
                  e.preventDefault();
                }
                else
                  return $scope.quantity;
              }
            }
          ]
        });

        popup.then(function (ok) {
          if (ok) {
            var $product =
            {
              'id': $id,
              'quantity': $scope.quantity,
              'price': $scope.price
            };

            $scope.cartProducts.push($product);
            $window.localStorage.setItem('cart', JSON.stringify($scope.cartProducts));
          }
        });
      };

      $scope.initializeView();
    })
})();
