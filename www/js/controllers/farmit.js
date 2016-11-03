/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.farmit', [])

    .controller('FarmItCtrl', function (RememberMeService) {
      // If the user has selected the remember me option, then login for him, in order to take a token,
      // and redirect him at the home view.
      RememberMeService.checkRememberMeOptionAndNavigate();
    })
})();
