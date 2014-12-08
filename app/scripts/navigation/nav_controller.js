(function(){

  angular.module('myApp').controller('NavCtrl', function($scope, $location, $cookieStore) {

    $scope.logout = function(){
      $cookieStore.remove('currentUser');
      $location.path('/');
    };



var cuser = $cookieStore.get('currentUser');
  if(cuser){
    $scope.currentUsername = cuser.username;
  }
    // $scope.currentUsername = $cookieStore.get('currentUser').username;
        //console.log($scope.currentUsername);

  });

}());
