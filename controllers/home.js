angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$window',function($scope,$window) {
 
 $scope.logOut = function(){
 	firebase.auth().signOut().then(function() {
 		$window.location.href = "/#/login"
	}, function(error) {
	  console.log(error);
	});
 }

 }]);