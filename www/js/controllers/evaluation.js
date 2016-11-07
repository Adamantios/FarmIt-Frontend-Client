/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.evaluation', [])

    .controller('EvaluationCtrl', function ($scope, $stateParams, $ionicPopup, EvaluationService) {
      $scope.rating = {};
      $scope.rating.rate = 0;
      $scope.rating.max = 5;
      $scope.name = $stateParams.name;
      $scope.id = $stateParams.id;

      $scope.evaluate = function () {
        EvaluationService.evaluate($scope.id).then(function () {
            $ionicPopup.alert
            ({
              title: 'Thanks for the feedback',
              template: 'Your evaluation has been successfully submitted.'
            });
          },
          function () {
            $ionicPopup.alert
            ({
              title: 'Error',
              template: 'Something went wrong while trying to submit your evaluation! Please try again later!'
            });
          })
      };
    })
})();
