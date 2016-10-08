/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.announcement', [])

    .controller('AnnouncementCtrl', function ($scope, $ionicPopup, $state, CategoriesService, SubcategoriesService,
                                              NetworkHelperService) {
      $scope.isSpinning = false;
      $scope.announcements = {};
      $scope.announcements.category = null;
      $scope.announcements.subcategory = null;
      $scope.categories = {};
      $scope.subcategories = {};

      CategoriesService.get_categories().success(function ($data) {
        $scope.categories = $data['categories'];
      });

      $scope.get_subcategories = function () {
        alert($scope.announcements.category);
        SubcategoriesService.get_subcategories($scope.announcements.category).success(function ($data) {
          $scope.subcategories = $data['subcategories'];
        });
      };

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
