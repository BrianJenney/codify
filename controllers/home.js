angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$window','$timeout',function($scope,$window,$timeout) {


//get current user to determine if admin
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.email)
  } else {
    console.log("nope")
  }

  //needs timeout to allow page to render first
  $timeout(function(){
  	//if user email is mine then you're the admin
  if(user.email === 'brianjenney83@gmail.com' || user.email === 'mattbrody@codify.com' || user.email === 'isaac@codfiyacademy.com' || user.email === 'Philipp.schulte@ymail.com'){
  	$scope.isAdmin = true;
  }else{
  	$scope.isAdmin = false;
  }

  //console.log($scope.isAdmin);
  })

});
 
 $scope.logOut = function(){
 	firebase.auth().signOut().then(function() {
 		$window.location.href = "/#/login"
	}, function(error) {
	  console.log(error);
	});
 }

 }]);