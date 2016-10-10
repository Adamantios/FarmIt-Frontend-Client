/**
 * Created by Manos on 28/4/2016.
 */
(function () {

  angular.module('app.controllers.first.address', [])

    .controller('FirstAddressCtrl', function ($scope, $state, $ionicPopup, AddressService) {
      $scope.isSpinning = false;

      $scope.newAddress = function ($street, $number, $area, $zip, $tel) {
        $scope.isSpinning = true;

        AddressService.createAddress($street, $number, $area, $zip, $tel).then(function () {
          $scope.isSpinning = false;
          $state.go('home.menu-content');
        }, function () {
          $scope.isSpinning = false;

          // Alert dialog
          $ionicPopup.alert({
            title: 'Error!',
            template: 'Something went wrong while trying to create your first address! Please try again!'
          });
        });
      };
    })
})();
