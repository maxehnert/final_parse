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

        var addCustProfile = function (cust, user) {
          console.log(user);
          $http.put(PARSE_URI + 'users/'+ user.objectId, cust, PARSE_HEADERS)
            .success( function (cust) {
              $cookieStore.put('currentUser', cust);
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
          addCustProfile: addCustProfile,
          updateMechanic: updateMechanic,
          getAllUsers: getAllUsers
        }

      }
    ]);

}());
