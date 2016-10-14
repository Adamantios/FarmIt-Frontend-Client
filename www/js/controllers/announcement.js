/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.announcement', [])

    .controller('AnnouncementCtrl', function ($scope, $ionicPopup, $state, $interval, $ionicModal, CategoriesService,
                                              SubcategoriesService, NetworkHelperService, AnnouncementService) {
      $scope.products = {};
      $scope.products.categorySelected = null;
      $scope.products.subcategorySelected = null;
      $scope.products.amount = null;
      $scope.products.amountPristine = true;
      $scope.categories = {};
      $scope.subcategories = {};
      $scope.successFlag = false;
      $scope.product = null;
      $scope.announcement = [];
      $scope.isSpinning = false;

      $scope.removePristine = function () {
        $scope.products.amountPristine = false;
      };

      CategoriesService.get_categories().success(function ($data) {
        $scope.categories = $data['categories'];
      });

      $scope.get_subcategories = function () {
        SubcategoriesService.get_subcategories($scope.products.categorySelected.id).success(function ($data) {
          $scope.subcategories = $data['subcategories'];
        });
      };

      $scope.addProduct = function () {
        $scope.product = {
          category: $scope.products.categorySelected,
          subcategory: $scope.products.subcategorySelected,
          amount: $scope.products.amount
        };

        $scope.announcement.push($scope.product);

        $scope.products.categorySelected = null;
        $scope.products.subcategorySelected = null;
        $scope.products.amountPristine = true;
        $scope.products.amount = null;

        // Success message
        $scope.successFlag = true;

        // Erase message after 2 second
        $interval(function () {
          $scope.successFlag = false;
        }, 2000);
      };

      $ionicModal.fromTemplateUrl('templates/announcement-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
        $scope.products.price = null;
        $scope.products.duration = 1;
      });

      $scope.DeleteProduct = function ($index) {
        $scope.announcement.splice($index, 1);

        if ($scope.announcement.length == 0) {
          $scope.products.price = null;
          $scope.products.duration = 1;
          $scope.modal.hide();
        }
      };

      $scope.createAnnouncement = function () {
        $scope.isSpinning = true;

        AnnouncementService.upload($scope.announcement, $scope.products.price, $scope.products.duration)
          .then(function () {
            $scope.announcement = [];
            $scope.products.price = null;
            $scope.products.duration = 1;
            $scope.isSpinning = false;
            $scope.modal.hide();
            $state.go('home.menu-content');
          }, function () {
            $scope.isSpinning = false;

            // Alert dialog
            $ionicPopup.alert({
              title: 'Error!',
              template: 'Something went wrong while trying to upload your announcement! Please try again!'
            });
          });
      };
    })
})();
