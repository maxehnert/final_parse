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
