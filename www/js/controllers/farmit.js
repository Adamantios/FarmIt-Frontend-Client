/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.farmit', [])

    .controller('FarmItCtrl', function ($scope, $window, $state) {
      // If user has selected the remember me option
      if ($window.localStorage.getItem('remember_me') === true)
        $state.go('home.menu-content');
    })
})();
