angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl',['$scope','$window','$timeout','chapterService',function($scope,$window,$timeout, chapterService) {
 

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
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				//take user to the last chapter they completed
				chapterService.getCompleteRate(user).then(function(snapshot){
					var student = snapshot.val();
					if(typeof student.currentweek !== 'undefined' && student.currentweek > 0){
						$window.location.href = "/#/chapter" + student.currentweek;
					}else{
						$window.location.href = "/#/home";
					}
				})
			}
		})
		}
	});

}


 }]);
