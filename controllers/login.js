angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl',['$scope','$window','$timeout',function($scope,$window,$timeout) {
 

$scope.isError = false;
//function to authenticate user and redirect to home page
$scope.loginUser = function(){
	var email =  $scope.userEmail;
  	var password = $scope.userPassword;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  	$scope.$apply(function(){
	  		$scope.isError = true;
	  		$scope.errorMessage = error.message;
	    	console.log($scope.errorMessage);
	  	})
	  	

}).then(function(){
	if(!$scope.isError){
		console.log("logged in");
		$window.location.href = "/#/home";
	}
});

}


 }]);
