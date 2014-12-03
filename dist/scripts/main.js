(function () {

    angular.module('myApp', ['ngRoute', 'ngCookies'])
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
        templateUrl: 'scripts/users/login.html',
        controller: 'User'
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

}());

(function () {

    angular.module('myApp').controller('User', ['UserFactory', '$scope',
      function (UserFactory, $scope) {

        $scope.register = function (user) {
          UserFactory.register(user);
        };

        $scope.login = function (user) {
          UserFactory.login(user);
        };

        $scope.logout = function () {
          UserFactory.logout();
        };

      }
    ]);

}());

(function () {

    angular.module('myApp').factory('UserFactory', ['PARSE_HEADERS', 'PARSE_URI', '$http', '$cookieStore', '$location',
      function (PARSE_HEADERS, PARSE_URI, $http, $cookieStore, $location) {

        var register = function (user) {
          return $http.post(PARSE_URI + 'users/', user, PARSE_HEADERS).success( function (data) {
            console.log(data);
            $location.path('/profile');
          });
        };

        var login = function (user) {
          var params = 'username='+user.username+'&password='+user.password;
          $http.get(PARSE_URI + 'login/?'+params, PARSE_HEADERS)
            .success( function (data) {
              $cookieStore.put('currentUser', data);
              return checkUser();
          });
        };

        var logout = function () {
          $cookieStore.remove('currentUser');
          $location.path('/');
        };

        var checkUser = function (user) {
          var user = $cookieStore.get('currentUser');
          if(user) {
            $location.path('/profile');
          } else {
            $location.path('/');
          }
        };
        var currentUser = function(user){
          var user = $cookieStore.get('currentUser');
        };

        return {
          login:    login,
          logout:   logout,
          register: register,
          checkUser: checkUser,
          currentUser: currentUser
        }

      }
  ]);

}());

(function(){

  angular.module('myApp').controller('NavCtrl', function($scope, $location, $cookieStore) {

    $scope.logout = function(){
      $cookieStore.remove('currentUser');
      $location.path('/');
    };

    $scope.currentUsername = $cookieStore.get('currentUser').username;
        console.log($scope.currentUsername);

  });

}());

(function(){

angular.module('myApp')
  .controller('ProfileCtrl', function ($scope, ProfileFactory) {

    // $scope.mech = {
    //     name: "",
    //     specialty: "",
    //     exp: "",
    //     travel: false,
    //     shop: false,
    //     location: "",
    //     bio: ""
    // };
    // $scope.submitForm = function(mechanic) {
    //   ProfileFactory.updateMechanic();
    //
    // };
    $scope.profile = function(mech){
      ProfileFactory.addProfile(mech);
      console.log(mech);
    }
});
}());

(function () {

  angular.module('myApp')
    .factory('ProfileFactory', ['$http', '$location', 'PARSE_HEADERS', 'PARSE_URI',
      function ($http, $location, PARSE_HEADERS, PARSE_URI) {

        var getProfile = function () {
          return $http.get(PARSE_URI + 'classes/Mechanic', PARSE_HEADERS);
        };

        var addProfile = function (mech) {
          $http.post(PARSE_URI + 'classes/Mechanic', mech, PARSE_HEADERS)
            .success( function () {
            console.log('sweet');
            }
          );
        };

        var updateMechanic = function(mechanic){
          $httmpost(PARSE_URI + 'class/Mechanic', mechanic, PARSE_HEADERS).success(function(){
            $location.path('/');
          });
        };

        return {
          getProfile: getProfile,
          addProfile: addProfile,
          updateMechanic: updateMechanic
        }

      }
    ]);

}());
