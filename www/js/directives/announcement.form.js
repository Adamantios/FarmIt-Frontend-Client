/**
 * Created by Manos on 30/4/2016.
 */
(function () {

  angular.module('app.directives.announcement', [])

    .directive('announcementForm', function(){
      return{
        restrict:'E',
        templateUrl:'templates/announcement-form.html'
      };
    })

})();
