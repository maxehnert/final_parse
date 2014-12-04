(function(){

angular.module('myApp')
  .controller('ProfileCtrl', function ($scope, ProfileFactory, $cookieStore) {
    $scope.currentUser = $cookieStore.get('currentUser');
    // $scope.mech = {
    //     name: "",
    //     specialty: "",
    //     exp: "",
    //     travel: false,
    //     shop: false,
    //     location: "",
    //     bio: ""
    // };
    // $scope.submitForm = function(mechanic) {
    //   ProfileFactory.updateMechanic();
    //
    // };
    $scope.profile = function(mech){

      ProfileFactory.addProfile(mech, $scope.currentUser);
      console.log(mech);
    };

    // $scope.currentUsername = $cookieStore.get('currentUser').username;
    //  $scope.mech = $cookieStore.get('currentUser');
     //console.log($cookieStore.get('currentUser'));
    // $scope.mech = $cookieStore.get
});
}());
