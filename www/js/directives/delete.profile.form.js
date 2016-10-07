/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.directives.delete.profile', [])

    .directive('deleteProfile', function(){
      return{
        restrict:'E',
        templateUrl:'templates/delete-profile-form.html'
      };
    })

})();
