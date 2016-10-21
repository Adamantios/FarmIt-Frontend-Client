(function () {

  angular.module('app.directives.offers.list', [])

    .directive('offersList', function(){
      return{
        restrict:'E',
        templateUrl:'templates/offers-list.html'
      };
    })

})();
