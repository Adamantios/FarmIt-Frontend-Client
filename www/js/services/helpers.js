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

    .factory('CartHelperService', function ($state, $window, $ionicPopup, PurchasesService) {
      return {
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
          var $distinctProductInCart = [];

          angular.forEach(cartProducts, function (product) {
            $totalPrice += parseFloat(product.price);

            if ($distinctProductInCart.indexOf(product.id) == -1) {
              $distinctProductInCart.push(product.id);
              var $extraShipping = parseFloat(product.shipping);
              var $extraAdditional = parseFloat(product.additional);
              $shipping += $extraShipping;
              $additional += $extraAdditional;
              $totalPrice += $extraShipping + $extraAdditional;
            }
          });

          return {
            'shipping': $shipping,
            'additional': $additional,
            'totalPrice': $totalPrice
          }
        },

        deleteProduct: function ($index, modal, cartProducts, totalPrice) {
          var $distinctProductInCart = [];
          var $productToRemove = cartProducts[$index].id;
          var $shipping = cartProducts[$index].shipping;
          var $additional = cartProducts[$index].additional;

          totalPrice -= parseFloat(cartProducts[$index].price);
          cartProducts.splice($index, 1);

          angular.forEach(cartProducts, function (product) {
            if ($distinctProductInCart.indexOf(product.id) == -1)
              $distinctProductInCart.push(product.id);
          });

          if ($distinctProductInCart.indexOf($productToRemove) == -1) {
            var $removingShipping = parseFloat($shipping);
            var $removingAdditional = parseFloat($additional);
            $shipping -= $removingShipping;
            $additional -= $removingAdditional;
            totalPrice -= $removingShipping + $removingAdditional;
          }

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
                template: 'An email with your purchase details have been sent to your email account.' +
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
