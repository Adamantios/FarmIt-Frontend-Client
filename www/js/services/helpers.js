/**
 * Created by Manos on 28/4/2016.
 */
(function () {

  angular.module('app.services.helpers', [])

    .factory('RememberMeService', function ($window, $state, $ionicLoading, LogInService) {
      return {
        checkRememberMeOptionAndNavigate: function () {
          // If user has selected the remember me option
          if ($window.localStorage.getItem('remember_me') == true ||
            $window.localStorage.getItem('remember_me') == 'true') {

            $ionicLoading.show({
              templateUrl: 'templates/loader.html',
              animation: 'fade-in'
            });

            LogInService.logInBackstage($window.localStorage.getItem('email'), $window.localStorage.getItem('token'))
              .then(function ($success) {
                $window.localStorage.setItem('token', $success.data.token);
                $ionicLoading.hide();

                if (!$success.data.addresses)
                  $state.go('first-address');
                else
                  $state.go('home.menu-content');
              });
          }
        }
      }
    })

    .factory('NetworkHelperService', function ($rootScope, $ionicPopup) {
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
            return navigator.connection.type !== Connection.NONE;
          else
            noInternetPopup();
        },

        addListener: function () {
          $ionicPlatform.ready(function () {
            $rootScope.$on('$cordovaNetwork:offline', noInternetPopupAndExit());
          }, false);
        }
      }
    })

    .factory('CartHelperService', function ($state, $window, $http, $ionicPopup, PurchasesService, SERVER) {
      return {
        getCart: function () {
          var $url = SERVER.url + 'api/cart/get_cart';

          var $parameters =
          {
            "email": $window.localStorage.getItem('email'),
            "token": $window.localStorage.getItem('token')
          };

          return $http.post($url, $parameters)
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        },

        updateCart: function () {
          var $url = SERVER.url + 'api/cart/change_cart';
          var $cart = [].toString();

          if ($window.localStorage.getItem('cart'))
            $cart = $window.localStorage.getItem('cart').toString();

          var $parameters =
          {
            "cart": $cart,
            "email": $window.localStorage.getItem('email'),
            "token": $window.localStorage.getItem('token')
          };

          return $http.post($url, $parameters)
            .success(function ($returnedData) {
              return $returnedData;
            })
            .error(function ($returnedData) {
              return $returnedData;
            });
        },

        initializeCart: function () {
          if ($window.localStorage.getItem('cart'))
            return JSON.parse($window.localStorage.getItem('cart'));
          else
            return [];
        },

        openCart: function (modal, cartProducts) {
          modal.show();
          var $totalPrice = 0;
          var $shipping = 0;
          var $additional = 0;

          angular.forEach(cartProducts, function (product) {
            $totalPrice += parseFloat(product.price);
            var $extraShipping = parseFloat(product.shipping);
            var $extraAdditional = parseFloat(product.additional);
            $shipping += $extraShipping;
            $additional += $extraAdditional;
            $totalPrice += $extraShipping + $extraAdditional;
          });

          return {
            'shipping': $shipping,
            'additional': $additional,
            'totalPrice': $totalPrice
          }
        },

        deleteProduct: function ($index, modal, cartProducts, totalPrice) {
          var $shipping = parseFloat(cartProducts[$index].shipping);
          var $additional = parseFloat(cartProducts[$index].additional);
          totalPrice -= $shipping + $additional;
          totalPrice -= parseFloat(cartProducts[$index].price);
          cartProducts.splice($index, 1);

          if (cartProducts.length == 0)
            modal.hide();

          $window.localStorage.setItem('cart', JSON.stringify(cartProducts));

          return {
            'cartProducts': cartProducts,
            'shipping': $shipping,
            'additional': $additional,
            'totalPrice': totalPrice
          }
        },

        purchase: function (modal, cartProducts, totalPrice) {
          var $failed = false;
          PurchasesService.upload(cartProducts, totalPrice).then(function () {
              totalPrice = 0;
              cartProducts = [];
              $window.localStorage.setItem('cart', cartProducts);
              modal.hide();
              $state.go('home.menu-content');
              $ionicPopup.alert({
                title: 'Excellent choice!',
                template: 'An email with your purchase details has been sent to your account.' +
                ' In the mean time... Farmit some more!'
              });
            },
            function () {
              $failed = true;

              // Alert dialog
              $ionicPopup.alert({
                title: 'Error!',
                template: 'Something went wrong while trying to complete your purchase! Please try again!'
              });
            });

          return {
            'cartProducts': cartProducts,
            'totalPrice': totalPrice,
            'failed': $failed
          }
        }
      }
    })

    .factory('EmailHelperService', function ($ionicPopup) {
      return {
        forgotMyPasswordEmail: function () {
          // Confirm dialog
          $ionicPopup.show({
            title: 'Forgot Your Password',
            template: 'Would you like to restore your password?',
            buttons: [
              {
                text: "No"
              },
              {
                text: "Yes",
                type: 'button-positive',
                onTap: function () {
                  // Send email. If success below, otherwise another alert.

                  // Alert dialog
                  $ionicPopup.alert({
                    title: 'Check you emails',
                    template: 'An email has been sent to your account. ' +
                    'Follow the directions in order to create a new password.'
                  });
                }
              }
            ]
          });
        },

        purchaseEmail: function () {

        }
      }
    });
})();
