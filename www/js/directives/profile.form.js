/**
 * Created by Manos on 25/4/2016.
 */
(function () {

  angular.module('app.directives.profile', [])

    .directive('profileForm', function(){
      return{
        restrict:'E',
        templateUrl:'templates/profile-form.html'
      };
    })

})();
