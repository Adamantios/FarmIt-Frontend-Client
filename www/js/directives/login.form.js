/**
 * Created by Manos on 26/4/2016.
 */
(function () {

  angular.module('app.directives.login', [])

    .directive('loginForm', function(){
      return{
        restrict:'E',
        templateUrl:'templates/login-form.html'
      };
    })

})();
