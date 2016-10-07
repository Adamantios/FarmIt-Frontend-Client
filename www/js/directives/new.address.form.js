/**
 * Created by Manos on 27/4/2016.
 */
(function () {

  angular.module('app.directives.new.address', [])

    .directive('newAddressForm', function(){
      return{
        restrict:'E',
        templateUrl:'templates/new-address-form.html'
      };
    })

})();
