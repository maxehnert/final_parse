(function () {

  angular.module('myApp')
    .factory('ProfileFactory', ['$http', '$location', '$cookieStore', 'PARSE_HEADERS', 'PARSE_URI',
      function ($http, $location, $cookieStore, PARSE_HEADERS, PARSE_URI) {

        var user = $cookieStore.get('currentUser');

        PARSE_HEADERS.headers['X-Parse-Session-Token'] = user.sessionToken;

        var getProfile = function () {
          return $http.get(PARSE_URI + 'users/<objectId>', PARSE_HEADERS);
        };

        var addProfile = function (mech, user) {
          console.log(user);
          $http.put(PARSE_URI + 'users/'+ user.objectId, mech, PARSE_HEADERS)
            .success( function (mech) {
              $cookieStore.put('currentUser', mech);
              console.log('sweet');
            });
        };

        var updateMechanic = function(mechanic){
          $httmpost(PARSE_URI + 'users/<objectId>', mechanic, PARSE_HEADERS).success(function(){
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
