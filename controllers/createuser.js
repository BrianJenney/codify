angular.module('myApp.createuser', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/createuser', {
    templateUrl: 'views/createuser.html',
    controller: 'CreateUserCtrl'
  });
}])

.controller('CreateUserCtrl',['$scope','$window','$timeout','$http',function($scope,$window,$timeout,$http) {

$( function() {
    $( "#datePicker").datepicker(
    	{ beforeShowDay: function(day) {
            var day = day.getDay();
            if (day == 1 || day == 2 || day == 3 || day == 4 || day == 5) {
                return [false, "somecssclass"]
            } else {
                return [true, "someothercssclass"]
            }
        },
        onSelect: function(dateText, inst) { 
		      var dateAsString = dateText;
		    
		      $scope.date = dateAsString;
		   }
    	})
  });

//initialize array for dropdown of instructors
$scope.instructors = ['Isaac', 'Brian', 'Chris'];



 //function to create user
$scope.createUser = function(){
	//initialize bool for catching user create error
	var isError = false;
	$scope.isError = false;
		
	$scope.creatingUser = true;

	  var email =  $scope.userEmail;
	  var password = $scope.userPassword;
	  

	  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  isError = true;
	  
	  $scope.$apply(function(){
	  	$scope.errorMessage = error.message;
	  	$scope.isError = true;
	  	$scope.creatingUser = false;
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
			email: $scope.userEmail,
			name: $scope.userName,
			mentor: $scope.selectedInstructor.trim(),
			phone: $scope.phone,
			date: $scope.date
		})

		//redirect to login
		$window.location.href="/#/login"
		}
		
	});
	}



 }]);
