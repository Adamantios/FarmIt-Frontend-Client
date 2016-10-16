/**
 * Created by Manos on 17/4/2016.
 */
(function () {

  angular.module('app.controllers.profile', [])

    .controller('ProfileCtrl', function ($scope) {

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
