(function(){

angular.module('myApp')
  .controller('HomeCtrl',['$scope', '$cookieStore', 'ProfileFactory', function ($scope, $cookieStore, ProfileFactory) {
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
  //  $scope.search = function(query) {
  //     HomeFactory.searchResults(query({where: {loc: {$regex: query}}}).then(function(data) {
  //       $scope.users = data;
  //       console.log(data.results);
  //     }));
  //   }
    // $scope.users =
    // [{name: 'max'},{name: 'john'}];

}]);
}());
