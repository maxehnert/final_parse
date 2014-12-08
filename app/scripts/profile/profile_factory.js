(function () {

  angular.module('myApp')
    .factory('ProfileFactory', ['$http', '$location', '$cookieStore', 'PARSE_HEADERS', 'PARSE_URI',
      function ($http, $location, $cookieStore, PARSE_HEADERS, PARSE_URI) {

        var user = $cookieStore.get('currentUser');

        PARSE_HEADERS.headers['X-Parse-Session-Token'] = user.sessionToken;

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
              console.log('sweet');
            });
        };
        //NOT USED
        var updateMechanic = function(mechanic){
          $httmpost(PARSE_URI + 'users/<objectId>', mechanic, PARSE_HEADERS).success(function(){
            $location.path('/');
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
