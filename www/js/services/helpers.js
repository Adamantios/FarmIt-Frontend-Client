/**
 * Created by Manos on 28/4/2016.
 */
(function () {

  angular.module('app.services.helpers', [])

    .factory('NetworkHelperService', function ($ionicPopup) {
      var noInternetPopup = function () {
        // Alert dialog
        $ionicPopup.alert({
          title: 'No internet connection!',
          template: 'Internet connection is required for this action!'
        });
      };

      var noInternetPopupAndExit = function () {
        $ionicPopup.alert({
          title: 'No Internet Connection',
          content: 'Farmit requires internet connection! Please connect and try again!'
        })
          .then(function () {
            ionic.Platform.exitApp();
          });
      };

      return {
        isConnected: function () {
          if (window.Connection)
            return navigator.connection.type != Connection.NONE;
          else
            noInternetPopup();
        },

        addListener: function () {
          document.addEventListener("offline", noInternetPopupAndExit(), false);
        }
      }
    })
})();
