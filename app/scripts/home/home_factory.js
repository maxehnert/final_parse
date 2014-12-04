// (function () {
//
//   angular.module('myApp')
//     .factory('ProfileFactory', ['$http', '$location', '$cookieStore', 'PARSE_HEADERS', 'PARSE_URI',
//       function ($http, $location, $cookieStore, PARSE_HEADERS, PARSE_URI) {
//
//         var user = $http.get(PARSE_URI + 'users/' + user.objectId);
//
//         PARSE_HEADERS.headers['X-Parse-Session-Token'] = user.sessionToken;
//
//
//         return {
//           getProfile: getProfile,
//           addProfile: addProfile,
//           updateMechanic: updateMechanic
//         }
//
//       }
//     ]);
//
// }());
