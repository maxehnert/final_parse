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
