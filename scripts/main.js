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
            $location.path('/myprofile');
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



var cuser = $cookieStore.get('currentUser');
  if(cuser){
    $scope.currentUsername = cuser.username;
    $scope.currentUseremail = cuser.email;
  }
    // $scope.currentUsername = $cookieStore.get('currentUser').username;
        //console.log($scope.currentUsername);

  });

}());

(function(){

angular.module('myApp')
  .controller('ProfileCtrl', function ($scope, ProfileFactory, $cookieStore) {
    $scope.currentUser = $cookieStore.get('currentUser');

    $scope.profile = function(mech){

      ProfileFactory.addProfile(mech, $scope.currentUser);
      console.log(mech);
    };
    $scope.updateProfile = function(currentUser){

      ProfileFactory.updateMechanic(currentUser, $scope.currentUser);
      console.log(currentUser);
    };

    // $scope.getProfile = function(mech){
    //
    //   ProfileFactory.getProfile(mech, $scope.currentUser);
    //   console.log(mech);
    // };

    // $scope.gravatar = function(mech){
    //   var gravatar = md5.createHash($scope.mech.email || '');
    // }

});
}());

(function () {

  angular.module('myApp')
    .factory('ProfileFactory', ['$http', '$location', '$cookieStore', 'PARSE_HEADERS', 'PARSE_URI',
      function ($http, $location, $cookieStore, PARSE_HEADERS, PARSE_URI) {

        var cuser = $cookieStore.get('currentUser');
        if(cuser){
        PARSE_HEADERS.headers['X-Parse-Session-Token'] = cuser.sessionToken;
        };
        
        var getAllUsers = function(){
          return $http.get(PARSE_URI + 'users/', PARSE_HEADERS);
        };
        //NOT USED
        var getProfile = function () {
          return $http.get(PARSE_URI + 'users/'+ user.objectId, mech, PARSE_HEADERS)
          .success( function (mech) {
            $cookieStore.get('currentUser', mech);
            console.log('alrighty');
          });
        };

        var addProfile = function (mech, user) {
          console.log(user);
          $http.put(PARSE_URI + 'users/'+ user.objectId, mech, PARSE_HEADERS)
            .success( function (mech) {
              $cookieStore.put('currentUser', mech);
              $location.path('/myprofile');
              console.log('sweet');
            });
        };

        var updateMechanic = function(currentUser, user){
          $http.post(PARSE_URI + 'users/' + user.objectId, currentUser, PARSE_HEADERS).success( function (mech) {
            $cookieStore.put('currentUser', mech);
            $location.path('/myprofile');
            console.log('sweet');
          });
        };

        return {
          getProfile: getProfile,
          addProfile: addProfile,
          updateMechanic: updateMechanic,
          getAllUsers: getAllUsers
        }

      }
    ]);

}());

(function(){

angular.module('myApp')
  .controller('HomeCtrl',['$scope', '$cookieStore', '$http', 'PARSE_HEADERS', 'PARSE_URI',  'ProfileFactory', '$routeParams', function ($scope, $cookieStore, $http,  PARSE_HEADERS, PARSE_URI, ProfileFactory, $routeParams) {
    // $scope.currentUser = $cookieStore.get('currentUser');
    //
    // $scope.profile = function(mech){
    //
    //   ProfileFactory.addProfile(mech, $scope.currentUser);
    //   console.log(mech);
    // };

  ProfileFactory.getAllUsers().success(function(data){
    $scope.users = data.results;
    console.log(data);
  });
console.log($routeParams);

  $http.get(PARSE_URI + 'users/' + $routeParams.cat, PARSE_HEADERS).success(function(data){
    $scope.user = data;
    console.log(data);
});
    // $scope.users =
    // [{name: 'max'},{name: 'john'}];

}]);
}());
