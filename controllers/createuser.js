angular.module('myApp.createuser', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/createuser', {
    templateUrl: 'views/createuser.html',
    controller: 'CreateUserCtrl'
  });
}])

.controller('CreateUserCtrl',['$scope','$window','$timeout','$http',function($scope,$window,$timeout,$http) {

//initialize array for dropdown of instructors
$scope.instructors = ['Isaac', 'Brian', 'Chris'];

//initialize bool for catching user create error
var isError = false;
$scope.isError = false;


 //function to create user
$scope.createUser = function(){
	
	  var email =  $scope.userEmail;
	  var password = $scope.userPassword;

	  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  isError = true;
	  
	  $scope.$apply(function(){
	  	$scope.errorMessage = error.message;
	  	$scope.isError = true;
	  })

	  console.log($scope.isError + ' ' + $scope.errorMessage)
	  // ...
	}).then(function(){
		//only run if no error in user creation
		if(!isError){

		$scope.isError = false;
		var user = firebase.auth().currentUser;
		//call email service and create branch for instructor/student
		$http.get("http://localhost:3000/sendmail?to=" + $scope.userEmail)

		firebase.database().ref('student/' + user.uid).set({
			name: $scope.userName,
			mentor: $scope.selectedInstructor.trim(),
			phone: $scope.phone
		})

		//redirect to login
		$window.location.href="/#/login"
		}
		
	});
	}



 }]);
