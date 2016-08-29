angular.module('myApp.createuser', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/createuser', {
    templateUrl: 'views/createuser.html',
    controller: 'CreateUserCtrl'
  });
}])

.controller('CreateUserCtrl',['$scope','$window','$timeout',function($scope,$window,$timeout) {
 
 //function to create user
$scope.createUser = function(){
	
	  var email =  $scope.userEmail;
	  var password = $scope.userPassword;

	  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	}).then(function(){
		$window.location.href="/#/login"
	});
}




 }]);
