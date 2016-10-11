/**
 * Created by Manos on 30/4/2016.
 */
(function () {

  angular.module('app.directives.providers', [])

    .directive('providersCard', function(){
      return{
        restrict:'E',
        templateUrl:'templates/providers-card.html'
      };
    })

    .directive('providersSearchCard', function(){
      return{
        restrict:'E',
        templateUrl:'templates/providers-search-card.html'
      };
    })

})();
