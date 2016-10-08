(function () {

  angular.module('app.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

        .state('signup', {
          url: '/signup',
          templateUrl: 'templates/signup.html',
          controller: 'SignUpCtrl'
        })

        .state('first-address', {
          url: '/basic-profile',
          templateUrl: 'templates/first-address.html',
          controller: 'FirstAddressCtrl'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LogInCtrl'
        })

        .state('home', {
          url: '/home',
          abstract: true,
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        })

        .state('home.menu-content', {
          url: '/home-menu-content',
          views: {
            'homeContent': {
              templateUrl: 'templates/home-menu-content.html',
              controller: 'HomeMenuCtrl'
            }
          }
        })

        .state('farmit', {
          url: '/farmit',
          templateUrl: 'templates/farmit.html',
          controller: 'FarmItCtrl'
        })

        .state('provider', {
          url: '/provider',
          templateUrl: 'templates/provider.html',
          controller: 'ProviderCtrl'
        })

        .state('evaluation', {
          url: '/evaluation',
          templateUrl: 'templates/evaluation.html',
          controller: 'EvaluationCtrl'
        })

        .state('profile', {
          url: '/profile',
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        })

        .state('address', {
          url: '/address',
          templateUrl: 'templates/address.html',
          controller: 'AddressCtrl'
        })

        .state('offers', {
          url: '/offers',
          templateUrl: 'templates/offers.html',
          controller: 'OffersCtrl'
        })

        .state('statistics', {
          url: '/statistics',
          templateUrl: 'templates/statistics.html',
          controller: 'StatisticsCtrl'
        })

        .state('announcement', {
          url: '/announcement',
          templateUrl: 'templates/announcement.html',
          controller: 'AnnouncementCtrl'
        })

        .state('chat', {
          url: '/chat',
          templateUrl: 'templates/chat.html',
          controller: 'ChatCtrl'
        })

        .state('purchase', {
          url: '/purchase',
          templateUrl: 'templates/purchase.html',
          controller: 'PurchaseCtrl'
        })

        .state('delete-profile', {
          url: '/delete-profile',
          templateUrl: 'templates/delete-profile.html',
          controller: 'DeleteProfileCtrl'
        });

      $urlRouterProvider.otherwise('/farmit')
    })

})();
