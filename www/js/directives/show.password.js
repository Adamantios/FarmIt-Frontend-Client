(function () {

  angular.module('app.directives.show.password', [])

    .directive('showPassword', [
      function () {
        return {
          restrict: 'A',
          scope: true,
          link: function (scope, element) {
            var showPasswordButton = angular.element
              ('<button class="button button-clear"><i class="ion-eye"></i></button>'),
              elementType = element.attr('type');

            // this hack is needed because Ionic prevents browser click event
            // from elements inside label with input
            showPasswordButton.on('mousedown', function (event) {
              element.attr('type') === elementType ? element.attr('type', 'text') : element.attr('type', elementType);
              showPasswordButton.toggleClass('button-positive');

              //prevent input field focus
              event.stopPropagation();
            });

            showPasswordButton.on('touchend', function (evt) {
              var syntheticClick = new Event('mousedown');
              evt.currentTarget.dispatchEvent(syntheticClick);

              //stop to block ionic default event
              evt.stopPropagation();
            });

            if (element.attr('type') === 'password')
              element.after(showPasswordButton);
          }
        };
      }]);
})();
