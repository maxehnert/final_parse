(function () {

    angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.gravatar'])
    .constant('PARSE_HEADERS', {
      headers: {
        'X-Parse-Application-Id': 'd5qCX3sGcYznZ6vwMWVyKmqEcYIVUsSDe5ENW9xs',
        'X-Parse-REST-API-Key': 'lyr7BjM1T98kW9wJq0MQyUjX9AgvHwvUvCWn4Gdg',
        'Content-Type': 'application/json'
      }
    })
    .constant('PARSE_URI', 'https://api.parse.com/1/')
    .config( function ($routeProvider) {

      $routeProvider.when('/', {
        templateUrl: 'scripts/home/home.html',
        controller: 'HomeCtrl'
      })
      .when('/register', {
        templateUrl: 'scripts/users/register.html',
        controller: 'User'
      })
      .when('/login', {
        templateUrl: 'scripts/users/login.html',
        controller: 'User'
      })
      .when('/profile', {
        templateUrl: 'scripts/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/myprofile', {
        templateUrl: 'scripts/profile/my-profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/updateProfile', {
        templateUrl: 'scripts/profile/update-profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/userprofile/:cat', {
        templateUrl: 'scripts/profile/moreInfoProfile.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        templateUrl: 'scripts/users/login.html',
        controller: 'User'
      })

    })
    // .run(['$rootScope', '$location', 'UserFactory', function ($rootScope, $location, UserFactory) {
    //   $rootScope.$on('$routeChangeStart', function (event) {
    //
    //     //UserFactory.checkUser();
    //
    //
    //   });
    // }])
    .directive('logOut', function (UserFactory) {
      return {
        link: function ($scope, element, attrs) {
          element.bind('click', function () {
            UserFactory.logout();
          });
        }
      }
    });
    angular.module('ui.gravatar').config([
  'gravatarServiceProvider', function(gravatarServiceProvider) {
    gravatarServiceProvider.defaults = {
      size     : 100,
      "default": "http://www.curefoundation.co.in/conphotogallery/1404818939_shadow2.JPG" //'mm'  // Mystery man as default for missing avatars
    };

    // Use https endpoint
    gravatarServiceProvider.secure = true;
  }
]);

}());
