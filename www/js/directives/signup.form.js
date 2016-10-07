/**
 * Created by Manos on 25/4/2016.
 */
(function () {

  angular.module('app.directives.signup', [])

    .directive('signupForm', function(){
      return{
        restrict:'E',
        templateUrl:'templates/signup-form.html'
      };
    })

})();
