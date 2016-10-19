/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.profile', [])

    .controller('ProfileCtrl', function ($scope, $state, $window, $ionicLoading, $ionicPopup, $ionicModal,
                                         ProfileService, AddressService) {
      $scope.profile = {};
      $scope.profile.id = null;
      $scope.profile.name = null;
      $scope.profile.surname = null;
      $scope.profile.email = null;
      $scope.profile.tel = null;
      $scope.profileBackup = {};
      $scope.profile.somethingChanged = false;
      $scope.moreInfo = {};
      $scope.moreInfo.addresses = [];
      $scope.moreInfo.id = null;
      $scope.moreInfo.alias = null;
      $scope.moreInfo.street = null;
      $scope.moreInfo.number = null;
      $scope.moreInfo.area = null;
      $scope.moreInfo.zip = null;
      $scope.moreInfo.tel = null;
      $scope.moreInfo.addressChanged = false;
      $scope.moreInfo.isSpinning = false;

      $scope.showLoader = function () {
        $ionicLoading.show({
          templateUrl: 'templates/loader.html',
          animation: 'fade-in'
        });
      };

      $scope.hideLoader = function () {
        $ionicLoading.hide();
      };

      $scope.redirect_with_alert = function () {
        var alertPopup = $ionicPopup.alert({
          title: 'Error loading data!',
          template: 'Something went wrong while trying to load your profile data. Please try again!'
        });

        alertPopup.then(function () {
          $state.go('home.menu-content');
        });
      };

      $scope.initializeView = function () {
        $scope.showLoader();

        ProfileService.getProfile().then(function ($success) {
            $scope.profileBackup = $success.data.data;
            $scope.profile.id = $success.data.data.id;
            $scope.profile.name = $success.data.data.name;
            $scope.profile.surname = $success.data.data.surname;
            $scope.profile.email = $success.data.data.email;
            $scope.profile.tel = $success.data.data.tel_num;
            $scope.profile.somethingChanged = false;

            AddressService.getAddresses().then(function ($success) {
              $scope.moreInfo.addresses = $success.data.data;
              $scope.hideLoader();
            },
            function () {
              $scope.hideLoader();
            });
          },
          function () {
            $scope.hideLoader();
            $scope.redirect_with_alert();
          });
      };

      $scope.changed = function () {
        $scope.profile.somethingChanged = !!($scope.profileBackup.name != $scope.profile.name ||
        $scope.profileBackup.surname != $scope.profile.surname ||
        $scope.profileBackup.email != $scope.profile.email ||
        $scope.profileBackup.tel_num != $scope.profile.tel);
      };

      $scope.addressChanged = function () {
        $scope.moreInfo.addressChanged = !!($scope.addressToEdit.alias != $scope.moreInfo.alias ||
        $scope.addressToEdit.street != $scope.moreInfo.street ||
        $scope.addressToEdit.number != $scope.moreInfo.number ||
        $scope.addressToEdit.area != $scope.moreInfo.area ||
        $scope.addressToEdit.zip_code != $scope.moreInfo.zip ||
        $scope.addressToEdit.tel_num != $scope.moreInfo.tel);
      };

      $scope.saveChanges = function () {
        // Confirm dialog
        $ionicPopup.show({
          title: 'Save changes',
          template: 'Do you want to save the changes on your profile?',
          buttons: [
            {
              text: "No"
            },
            {
              text: "Yes",
              type: 'button-positive',
              onTap: function () {
                ProfileService.updateProfile($scope.profile.id, $scope.profile.name, $scope.profile.surname,
                  $scope.profile.email, $scope.profile.tel)
                  .then(function () {
                      $window.localStorage.setItem('email', $scope.profile.email);
                      $scope.profile.somethingChanged = false;
                      $scope.profileBackup.name = $scope.profile.name;
                      $scope.profileBackup.surname = $scope.profile.surname;
                      $scope.profileBackup.email = $scope.profile.email;
                      $scope.profileBackup.tel_num = $scope.profile.tel;

                      $ionicPopup.alert({
                        title: 'Profile updated',
                        template: 'Your profile has been successfully updated.'
                      });
                    },
                    function ($error) {
                      var $message = 'Something went wrong while trying to update your profile.';

                      if ($error.status == 409)
                        $message = 'An account with that email already exists.';
                      else if ($error.status == 406)
                        if ($error.data.code == 1)
                          $message = 'You have not provided a valid email.';
                        else
                          $message = 'You have not provided a valid telephone number.';

                      $ionicPopup.alert({
                        title: 'Profile has not been updated',
                        template: $message
                      });
                    })
              }
            }
          ]
        });
      };

      $scope.changePassword = function () {
        $scope.popup = {};
        $scope.popup.old = null;
        $scope.popup.new = null;
        $scope.popup.again = null;

        $ionicPopup.show({
          templateUrl: 'templates/change-password.html',
          title: 'Change Your Password',
          scope: $scope,
          buttons: [
            {text: 'Cancel'},
            {
              text: 'Change',
              type: 'button-positive',
              onTap: function (e) {
                if (!$scope.popup.old || !$scope.popup.new || !$scope.popup.again) {
                  // Don't allow the user to close unless he enters all fields.
                  e.preventDefault();
                }
                else {
                  if ($scope.popup.new == $scope.popup.again) {

                    if ($scope.popup.old == $scope.popup.again) {
                      e.preventDefault();

                      $ionicPopup.alert({
                        title: 'No changes',
                        template: "No changes have been detected."
                      });
                    }

                    else
                      ProfileService.changePassword($scope.popup.old, $scope.popup.again).then(function () {
                          $ionicPopup.alert({
                            title: 'Password changed!',
                            template: "Your password has been changed."
                          });
                        },
                        function ($error) {
                          var $message = 'Something went wrong while trying to update your password.';

                          if ($error.status == 406)
                            $message = 'The old password that you have provided is wrong.';

                          $ionicPopup.alert({
                            title: 'Password has not been updated',
                            template: $message
                          });
                        });
                  }
                  else {
                    e.preventDefault();

                    $ionicPopup.alert({
                      title: 'Password has not changed!',
                      template: "The new password's fields do not match."
                    });
                  }
                }
              }
            }
          ]
        });
      };

      $ionicModal.fromTemplateUrl('templates/addresses.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $scope.openAddresses = function () {
        $scope.modal.show();
      };

      $scope.editAddress = function ($index) {
        $scope.index = $index;
        $scope.addressToEdit = $scope.moreInfo.addresses[$index];
        $scope.moreInfo.id = $scope.addressToEdit.id;
        $scope.moreInfo.alias = $scope.addressToEdit.alias;
        $scope.moreInfo.street = $scope.addressToEdit.street;
        $scope.moreInfo.number = $scope.addressToEdit.number;
        $scope.moreInfo.area = $scope.addressToEdit.area;
        $scope.moreInfo.zip = parseInt($scope.addressToEdit.zip_code);
        $scope.moreInfo.tel = parseInt($scope.addressToEdit.tel_num);

        $scope.newAddressPopup = $ionicPopup.show({
          templateUrl: 'templates/edit-address-form.html',
          cssClass: 'address-popup',
          title: 'Edit Your Address',
          scope: $scope,
          buttons: [{text: 'Close'}]
        });
      };

      $scope.changeAddress = function () {
        $ionicPopup.show({
          title: 'Save changes',
          template: 'Do you want to save the changes on your address?',
          buttons: [
            {
              text: "No"
            },
            {
              text: "Yes",
              type: 'button-positive',
              onTap: function () {
                if ($scope.moreInfo.alias == '') {
                  $scope.moreInfo.alias = $scope.moreInfo.street;
                }

                AddressService.editAddress($scope.moreInfo.id, $scope.moreInfo.alias, $scope.moreInfo.street,
                  $scope.moreInfo.number, $scope.moreInfo.area, $scope.moreInfo.zip, $scope.moreInfo.tel).then(function () {
                    $scope.newAddressPopup.close();
                    $scope.moreInfo.addressChanged = false;
                    var $editedAddress = {};
                    $editedAddress.id = $scope.moreInfo.id;
                    $editedAddress.alias = $scope.moreInfo.alias;
                    $editedAddress.street = $scope.moreInfo.street;
                    $editedAddress.number = $scope.moreInfo.number;
                    $editedAddress.area = $scope.moreInfo.area;
                    $editedAddress.zip_code = $scope.moreInfo.zip;
                    $editedAddress.tel_num = $scope.moreInfo.tel;

                    $scope.moreInfo.addresses[$scope.index] = $editedAddress;

                    $ionicPopup.alert({
                      title: 'Address updated',
                      template: 'Your address has been successfully updated.'
                    });
                  },
                  function () {
                    $ionicPopup.alert({
                      title: 'Address was not changed!',
                      template: "Something went wrong while trying to change your address! Please try again!"
                    });
                  })
              }
            }
          ]
        });
      };

      $scope.deleteAddress = function ($index) {
        AddressService.deleteAddress($scope.moreInfo.addresses[$index].id).then(function () {
            $scope.moreInfo.addresses.splice($index, 1);
          },
          function () {
            $ionicPopup.alert({
              title: "Address could not be deleted!",
              template: "Something went wrong while trying to delete your address! Please try again!"
            })
          });
      };

      $scope.addAddress = function () {
        $scope.newAddressPopup = $ionicPopup.show({
          templateUrl: 'templates/new-address-form.html',
          cssClass: 'address-popup',
          title: 'Add New Address',
          scope: $scope,
          buttons: [{text: 'Close'}]
        });
      };

      $scope.newAddress = function ($alias, $street, $number, $area, $zip, $tel) {
        $scope.isSpinning = true;

        if ($alias == null)
          $alias = $street;

        AddressService.createAddress($alias, $street, $number, $area, $zip, $tel).then(function () {
          $scope.isSpinning = false;
          $scope.newAddressPopup.close();

          $scope.initializeView();

        }, function () {
          $scope.isSpinning = false;

          $ionicPopup.alert({
            title: 'Error!',
            template: 'Something went wrong while trying to create your address! Please try again!'
          });
        });
      };

      $scope.initializeView();
    })

    .controller('SignUpCtrl', function ($scope, $window, $ionicPopup, $state, SignUpService) {

      $scope.isSpinning = false;
      $scope.login = {'isChecked': false};

      $scope.farmIn = function ($name, $surname, $email, $password, $tel) {
        $scope.isSpinning = true;

        SignUpService.signUp($name, $surname, $email, $password, $tel).then(function ($success) {
          $window.localStorage.setItem('remember_me', $scope.login['isChecked']);
          $window.localStorage.setItem('token', $success.data.token);
          $window.localStorage.setItem('email', $success.data.session.email);
          $scope.isSpinning = false;
          $state.go('first-address');
        }, function ($error) {
          $scope.isSpinning = false;

          var $message;

          if ($error.status == 409)
            $message = 'An account with that email already exists!';
          else
            $message = 'Something went wrong while trying to signup! Please try again!';

          // Alert dialog
          $ionicPopup.alert({
            title: 'Error!',
            template: $message
          });
        });
      };
    })

    .controller('LogInCtrl', function ($scope, $window, $ionicPopup, $state, LogInService, EmailHelperService) {
      $scope.isSpinning = false;
      $scope.login = {'isChecked': false};

      $scope.forgotYourPassword = function () {
        EmailHelperService.forgotMyPasswordEmail();
      };

      $scope.farmIn = function ($email, $password) {
        $scope.isSpinning = true;

        LogInService.logIn($email, $password).then(function ($success) {
          $window.localStorage.setItem('remember_me', $scope.login['isChecked']);
          $window.localStorage.setItem('token', $success.data.token);
          $window.localStorage.setItem('email', $success.data.session.email);
          $scope.isSpinning = false;

          if (!$success.data.addresses)
            $state.go('first-address');
          else
            $state.go('home.menu-content');

        }, function ($error) {
          $scope.isSpinning = false;

          var $message;

          if ($error.status == 403)
            $message = 'The email or the password that you have provided is wrong!';
          else
            $message = 'Something went wrong while trying to login! Please try again!';

          // Alert dialog
          $ionicPopup.alert({
            title: 'Error!',
            template: $message
          });
        });
      }
    })

    .controller('LogOutCtrl', function ($scope, $ionicPopup, $state, $window, $ionicSideMenuDelegate, LogOutService) {
      $scope.logOut = function () {
        // Confirm dialog
        $ionicPopup.show({
          title: 'Log Out',
          template: 'Are you sure that you want to log out?',
          buttons: [
            {
              text: "No"
            },
            {
              text: "Yes",
              type: 'button-positive',
              onTap: function () {
                LogOutService.logOut($window.localStorage.getItem('email')).then(function () {
                  $ionicSideMenuDelegate.toggleLeft();
                  $window.localStorage.setItem('remember_me', false);
                  $window.localStorage.setItem('token', null);
                  $window.localStorage.setItem('email', null);
                  $scope.isSpinning = false;
                  $state.go('farmit');
                }, function () {
                  // Alert dialog
                  $ionicPopup.alert({
                    title: 'Error!',
                    template: 'Something went wrong while trying to log out! Please try again!'
                  });
                });
              }
            }
          ]
        });
      };
    })

    .controller('DeleteProfileCtrl', function ($scope, $state, $ionicPopup, $window, $ionicSideMenuDelegate,
                                               DeleteProfileService, EmailHelperService) {

      $scope.isSpinning = false;

      $scope.forgotYourPassword = function () {
        EmailHelperService.forgotMyPasswordEmail();
      };

      $scope.goodbye = function ($email, $password) {
        // Confirm dialog
        $ionicPopup.show({
          title: 'Delete Profile',
          template: 'Are you sure that you want to delete your profile?',
          buttons: [
            {
              text: "No"
            },
            {
              text: "Yes",
              type: 'button-positive',
              onTap: function () {
                $scope.isSpinning = true;

                if ($email == $window.localStorage.getItem('email')) {
                  DeleteProfileService.deleteProfile($email, $password).then(function () {
                      $ionicSideMenuDelegate.toggleLeft();
                      $window.localStorage.setItem('remember_me', false);
                      $window.localStorage.setItem('token', null);
                      $window.localStorage.setItem('email', null);
                      $scope.isSpinning = false;
                      $state.go('farmit');
                    },
                    function () {
                      $scope.isSpinning = false;
                      // Alert dialog
                      $ionicPopup.alert({
                        title: 'Error!',
                        template: 'Something went wrong while trying to delete your profile! Please try again!'
                      });
                    });
                }

                else {
                  // Alert dialog
                  $ionicPopup.alert({
                    title: 'Wrong email!',
                    template: 'This is not the email you are signed in with!'
                  });
                }
              }
            }
          ]
        });
      }
    })
})();
