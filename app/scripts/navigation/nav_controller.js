(function(){

  angular.module('myApp').controller('NavCtrl', function($scope, $location, $cookieStore) {

    $scope.logout = function(){
      $cookieStore.remove('currentUser');
      $location.path('/');
    };

    $scope.currentUsername = $cookieStore.get('currentUser').username;
        console.log($scope.currentUsername);

  });

}());
