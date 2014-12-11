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
    //console.log(data);
  });
//console.log($routeParams);

  $http.get(PARSE_URI + 'users/' + $routeParams.cat, PARSE_HEADERS).success(function(data){
    $scope.user = data;
  //  console.log(data);
});
    // $scope.users =
    // [{name: 'max'},{name: 'john'}];

}]);
}());
