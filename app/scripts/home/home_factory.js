(function () {

  angular.module('myApp')
    .factory('HomeFactory', ['$http', '$location', '$cookieStore', 'PARSE_HEADERS', 'PARSE_URI',
      function ($http, $location, $cookieStore, PARSE_HEADERS, PARSE_URI) {

        var user = $http.get(PARSE_URI + 'users/' + user.objectId);

        // var searchResults = function(mech, user){
        //   return $http.get(PARSE_URI + 'users/'+ user.objectId, mech, PARSE_HEADERS);
        // };

        return {
          // searchResults: searchResults
        }

      }
    ]);

}());
