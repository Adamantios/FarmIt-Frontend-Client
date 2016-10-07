/**
 * Created by Manos on 23/4/2016.
 */
(function () {

  angular.module('app.directives.home', [])

    .directive('homeLeftMenu', function(){
      return{
        restrict:'E',
        templateUrl:'templates/home-left-menu.html'
      };
    })

})();
