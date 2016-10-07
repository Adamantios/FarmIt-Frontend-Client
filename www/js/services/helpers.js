/**
 * Created by Manos on 28/4/2016.
 */
(function () {

  angular.module('app.services.helpers', [])

    .factory('NetworkHelperService', function () {
      return {
        isConnected: function () {
          if (window.Connection)
            return navigator.connection.type != Connection.NONE;
        }
      };
    })
})();
