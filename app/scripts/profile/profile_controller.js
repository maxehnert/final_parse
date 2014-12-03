(function(){

angular.module('myApp')
  .controller('ProfileCtrl', function ($scope, ProfileFactory) {

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
      ProfileFactory.addProfile(mech);
      console.log(mech);
    }
});
}());
