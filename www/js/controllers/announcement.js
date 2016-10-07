/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.announcement', [])

    .controller('AnnouncementCtrl', function ($scope, $ionicPopup, $state, CategoriesService, SubcategoriesService,
                                              NetworkHelperService) {
      $scope.isSpinning = false;
      $scope.selectedCategory = null;
      $scope.selectedSubcategory = null;
      $scope.categories = [];
      $scope.subcategories = [];

      CategoriesService.get_categories().then(function ($success) {
          $scope.categories = $success.data.categories;
        },
        function ($error) {
          // Alert dialog
          $ionicPopup.alert({
            title: 'Error!',
            template: $error.data.message
          });
        });

      SubcategoriesService.get_subcategories($scope.selectedCategory).then(function ($success) {
          $scope.subcategories = $success.data.subcategories;
        },
        function ($error) {
          // Alert dialog
          $ionicPopup.alert({
            title: 'Error!',
            template: $error.data.message
          });
        });

      $scope.uploadAnnouncement = function () {
        if (!NetworkHelperService.isConnected()) {
          $scope.isSpinning = true;

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
