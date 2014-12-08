(function(){

angular.module('myApp')
  .controller('ProfileCtrl', function ($scope, ProfileFactory, $cookieStore, $http, $scope) {
    $scope.currentUser = $cookieStore.get('currentUser');

    $scope.profile = function(mech){

      ProfileFactory.addProfile(mech, $scope.currentUser);
      console.log(mech);
    };
    $scope.cprofile = function(cust){

      ProfileFactory.addCustProfile(cust, $scope.currentUser);
      console.log(cust);
    };
    $scope.updateProfile = function(currentUser){

      ProfileFactory.updateMechanic(currentUser, $scope.currentUser);
      console.log(currentUser);
    };

$http.get('https://api.edmunds.com/api/vehicle/v2/makes?view=basic&fmt=json&api_key=cp2qws3s85xm2jehvu3jz3s2')
.then(function (response)
      {
        $scope.makes = response.data.makes;
        }, function (error) {
        $scope.error1 = JSON.stringify(error);
        });

// for selected make - get all the models.
$scope.getmodels = function(makeNiceName) {
  console.log(makeNiceName);
    $http.get('https://api.edmunds.com/api/vehicle/v2/:'+makeNiceName+'/models?view=basic&fmt=json&api_key=cp2qws3s85xm2jehvu3jz3s2')
.then(function (response)
      {
        console.log(response.data.models);
        $scope.models = response.data.models;
        }, function (error) {
        $scope.error2 = JSON.stringify(error);
        });
};

$scope.getyear = function(makeNiceName, makeNiceModel){
$http.get('https://api.edmunds.com/api/vehicle/v2/'+makeNiceName+'/'+modelNiceName+'/years?state=new&view=basic&fmt=json&api_key=cp2qws3s85xm2jehvu3jz3s2')
.then(function (response)
      {
        console.log(response.data.years);
        $scope.models = response.data.years;
        }, function (error) {
        $scope.error3 = JSON.stringify(error);
        });

      };
////
});
}());
