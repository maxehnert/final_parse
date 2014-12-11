(function () {

  angular.module('myApp')
    .factory('HomeFactory', ['$http', '$location', '$cookieStore', 'PARSE_HEADERS', 'PARSE_URI',
      function ($http, $location, $cookieStore, PARSE_HEADERS, PARSE_URI) {

        var user = $http.get(PARSE_URI + 'users/' + user.objectId).success(function(data){

        });


        return {

        }

      }
    ]);

}());
