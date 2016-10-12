/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.provider', [])

    .controller('ProviderCtrl', function ($scope, $stateParams, GetProvidersService) {
      $scope.provider = null;
      $scope.product = null;
      $scope.products = [];
      $scope.fromSearch = $stateParams.fromSearch;
      $scope.isSpinning = false;

      $scope.initializeView = function () {
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
        $scope.isSpinning = true;
        GetProvidersService.getProducts($scope.provider.email).then(function ($success) {
            $scope.products.push($success.data.data);
            $scope.isSpinning = false;
          })
      };

      $scope.initializeView();
    })
})();
