(function(){

angular.module('myApp')
  .controller('ProfileCtrl', function ($scope, ProfileFactory, $cookieStore) {
    $scope.currentUser = $cookieStore.get('currentUser');

    $scope.profile = function(mech){

      ProfileFactory.addProfile(mech, $scope.currentUser);
      console.log(mech);
    };
    $scope.updateProfile = function(currentUser){

      ProfileFactory.updateMechanic(currentUser, $scope.currentUser);
      console.log(currentUser);
    };

    // $scope.getProfile = function(mech){
    //
    //   ProfileFactory.getProfile(mech, $scope.currentUser);
    //   console.log(mech);
    // };

    // $scope.gravatar = function(mech){
    //   var gravatar = md5.createHash($scope.mech.email || '');
    // }

});
}());
