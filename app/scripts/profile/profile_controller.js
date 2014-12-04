(function(){

angular.module('myApp')
  .controller('ProfileCtrl', function ($scope, ProfileFactory, $cookieStore) {
    $scope.currentUser = $cookieStore.get('currentUser');

    $scope.profile = function(mech){

      ProfileFactory.addProfile(mech, $scope.currentUser);
      console.log(mech);
    };

    
});
}());
