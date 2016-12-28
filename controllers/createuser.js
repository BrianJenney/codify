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

//initialize array for dropdown of mentors
	$scope.mentors = [];

	//initialize search object
	$scope.search = {};
	
	firebase.database().ref('mentor/').once('value').then(function(snapshot){
		for(mentor in snapshot.val()){
			$scope.mentors.push(mentor);
		}
	})

 //function to create user
$scope.createUser = function(){
	//initialize bool for catching user create error
	var isError = false;
	$scope.isError = false;

	//throw error if date not chosen
	if(typeof $scope.date == 'undefined' || $scope.date == ''){
		$scope.errorMessage = "Pick a Date";
		return;
	}
		
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
		//$http.get("http://localhost:3000/sendmail?to=" + $scope.userEmail)

		//insert instructor email
		switch($scope.selectedInstructor.trim()){
			case 'Brian':
			$scope.mentorEmail = 'bjenney83@gmail.com'
			break;

			case 'Isaac':
			$scope.mentorEmail = 'isaac@codfiyacademy.com'
			break;

			case 'Phillip':
			$scope.mentorEmail = 'Philipp.schulte@ymail.com'
			break;

			case 'Chris':
			$scope.mentorEmail = 'chrisbrody@codfiyacademy.com'
			break;
		}

		firebase.database().ref('student/' + user.uid).set({
			email: $scope.userEmail,
			name: $scope.userName,
			mentor: $scope.selectedInstructor.trim(),
			mentorEmail: $scope.mentorEmail,
			phone: $scope.phone,
			date: $scope.date,
			progress: 0,
			currentweek: 0
		})

		//redirect to login
		$window.location.href="/#/video"
		}
		
	});
	}



 }]);
