/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.announcement', [])

    .controller('AnnouncementCtrl', function ($scope, $ionicPopup, $state, $interval, $ionicModal, CategoriesService,
                                              SubcategoriesService, NetworkHelperService) {
      $scope.isSpinning = false;
      $scope.products = {};
      $scope.products.categorySelected = null;
      $scope.products.subcategorySelected = null;
      $scope.products.amount = null;
      $scope.categories = {};
      $scope.subcategories = {};
      $scope.successFlag = false;
      $scope.product = null;
      $scope.announcement = [];

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
          category: $scope.products.categorySelected.name,
          subcategory: $scope.products.subcategorySelected.name,
          amount: $scope.products.amount
        };

        $scope.announcement.push($scope.product);

        $scope.products.categorySelected = null;
        $scope.products.subcategorySelected = null;
        $scope.products.amount = null;

        // Success message
        $scope.successFlag = true;

        // Erase message after 2 second
        $interval(function () {
          $scope.successFlag = false;
        }, 2000);
      };

      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.createAnnouncement = function () {
        if (!NetworkHelperService.isConnected()) {
          $scope.isSpinning = true;
          // TODO upload announcement
          $scope.isSpinning = false;
          $scope.modal.hide();
          $state.go('farmit');
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
