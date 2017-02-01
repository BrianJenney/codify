angular.module('myApp.admin', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminCtrl'
  });
}])

.controller('AdminCtrl', ['$scope','$filter', '$http', '$window','filterFilter', '$timeout', function($scope, $filter, $http, $window, filterFilter, $timeout) {

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

	//array for am pm dropdown
	$scope.times = ['AM','PM'];

	//initialize search object
	$scope.search = {};

	//boolean to switch views from graduate to 
	$scope.alumni = false
	//initialize array to match student data with their id
	//the student array does not include id and was made before this feature
	//we'll need this to get their info to update the hiring modal
	$scope.studentID = [];
	//initialize array to store student object
	$scope.studentArray = [];

	//get current user to determine if admin
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    firebase.database().ref('mentor/').once('value').then(function(snapshot){
		for(mentor in snapshot.val()){
			//get dropdown for mentor names
				$scope.$apply(function(){
					$scope.mentors.push(snapshot.val()[mentor]);	
				})
			}
		}).then(function(){
			console.log(user.email)
			for(var m=0; m<$scope.mentors.length; m++){
				if($scope.mentors[m].email === user.email){
					$scope.$apply(function(){
						$scope.isAdmin = true;	
						$scope.getCurrentStudents(false);
					})		
					break;
				}else{
					$scope.$apply(function(){
						$scope.isAdmin = false;
					})	
				}
			}
		})
	  } else {
	    console.log("nope")
	  }
	// $timeout(function(){
	// 	console.log($scope.mentors)
 //  	//if user email is one of the tutors then you're the admin
	//   if(user.email === 'brianjenney83@gmail.com' || user.email === 'mattbrody@codify.com' || user.email === 'isaac@codfiyacademy.com' || user.email === 'Philipp.schulte@ymail.com'){
	//   		$scope.isAdmin = true;
	//   		$scope.getCurrentStudents(false);
	//   	}else{
	//   		$scope.isAdmin = false;
 //  		}
	//   },250)
	})


	//retrieve firebase data for students
	$scope.getCurrentStudents = function(bool){
		//if student array exists, erase and make new one 
		//so you don't append exiting values
		$scope.studentArray = $scope.studentArray.length > 0 ? $scope.studentArray = [] : $scope.studentArray;

		//switch view
		$scope.isAlumni = bool == false ? false: true;

		//get data based on if alumni view or current view
		firebase.database().ref('student/').orderByChild('graduated').equalTo(bool).once('value').then(function(snapshot){
				$scope.students = snapshot.val()
				//get object from id key of student
				angular.forEach($scope.students, function(value, key){
				$scope.student = value;
				$scope.$apply(function(){
				$scope.studentArray.push(value);
				$scope.filteredStudents = $scope.studentArray;
				//function to get week completion rate
				function getCompleteRate(week){
					if(week == null || week == 'undefined'){
						return 0
					}else{
						var count = 0;
						for(var key in week){
							//count all true fields and url inputs
							if(week[key]==true || week[key].length > 0){
								count++
							}
						}
						return count/Object.keys(week).length
					}
				}

				//get week assignment info
				for(var x=0; x<$scope.studentArray.length; x++){

					//get percentage of week for each student
					$scope.studentArray[x].week1CompleteRate = getCompleteRate($scope.studentArray[x].chapter1)	
					$scope.studentArray[x].week2CompleteRate = getCompleteRate($scope.studentArray[x].chapter2)
					$scope.studentArray[x].week3CompleteRate = getCompleteRate($scope.studentArray[x].chapter3)
					$scope.studentArray[x].week4CompleteRate = getCompleteRate($scope.studentArray[x].chapter4)
					$scope.studentArray[x].week5CompleteRate = getCompleteRate($scope.studentArray[x].chapter5)
					$scope.studentArray[x].week6CompleteRate = getCompleteRate($scope.studentArray[x].chapter6)
					$scope.studentArray[x].week7CompleteRate = getCompleteRate($scope.studentArray[x].chapter7)
					$scope.studentArray[x].week8CompleteRate = getCompleteRate($scope.studentArray[x].chapter8)
					$scope.studentArray[x].week9CompleteRate = getCompleteRate($scope.studentArray[x].chapter9)
					$scope.studentArray[x].week10CompleteRate = getCompleteRate($scope.studentArray[x].chapter10)
					$scope.studentArray[x].week11CompleteRate = getCompleteRate($scope.studentArray[x].chapter11)	
					$scope.studentArray[x].week12CompleteRate = getCompleteRate($scope.studentArray[x].chapter12)
					$scope.studentArray[x].week13CompleteRate = getCompleteRate($scope.studentArray[x].chapter13)
					$scope.studentArray[x].week14CompleteRate = getCompleteRate($scope.studentArray[x].chapter14)
					$scope.studentArray[x].week15CompleteRate = getCompleteRate($scope.studentArray[x].chapter15)
					$scope.studentArray[x].week16CompleteRate = getCompleteRate($scope.studentArray[x].chapter16)	
					
						//use their original start date in search instead of 
						//padded date due to breaks
						if(typeof $scope.studentArray[x].originaldate !== 'undefined'){
							$scope.studentArray[x].date = $scope.studentArray[x].originaldate;
						}
					}
				})
			})
		})
	}

	//delete property if null from search to ensure filter works when
	//all is selected
	$scope.filterStudents = function(search){

		search.date = $scope.date;

		if(search.mentor !== 'undefined'){
			if(search.mentor == null){
				delete search.mentor;	
			} 
		}
		if(search.time !== 'undefined'){
			if(search.time == null){
				delete search.time;
			}  
		}

		$scope.filteredStudents = $filter('filter')($scope.studentArray, search);
	}

	$scope.showWeek = function(week){
		//console.log(week);
		$scope.weekDetails = week;
		//check if week not yet started
		$scope.noWeek = typeof week == 'undefined' ? true : false;
	}

	//retrieve student info
	$scope.getStudentInfo = function(student){
		$scope.phoneNbr = parseInt(student.phone);
		$scope.email = student.email;
		$scope.studentName = student.name;	
		$scope.mentorEmail = student.mentorEmail;
	}

	//send text message to student
	$scope.sendText = function(message){
		$("#studentMessage").val('');
		$http.get('http://localhost:3000/sendtext?to=' + $scope.phoneNbr + '&message=' + message);
		 //$("[data-dismiss=modal]").trigger({ type: "click" });	 
	}

	//send email to student
	$scope.sendMail = function(message){
		$("#studentMessage").val('');
		$http.get('http://localhost:3000/sendmail?to=' + $scope.email + '&message=' + message + '&from=' + $scope.mentorEmail);
		//$("[data-dismiss=modal]").trigger({ type: "click" });
		
	}


	//send all students in class an email
	$scope.sendClassEmail = function(message){
		//set message back to null
		$scope.message = "";
		for(var x=0; x<$scope.filteredStudents.length; x++){
			//check if email exists
			if(typeof $scope.filteredStudents[x].email !== 'undefined'){
				$http.get('http://localhost:3000/sendmail?to=' + $scope.filteredStudents[x].email + '&message=' + message + '&from=' + $scope.filteredStudents[x].mentorEmail)
				//$("[data-dismiss=modal]").trigger({ type: "click" });
			}
		}
		
	}

	//send all students in class a twilio text message
	$scope.sendClassSMS = function(message){
		$("#studentMessage").val('');
		for(var x=0; x<$scope.filteredStudents.length; x++){
			//check if email exists
			if(typeof $scope.filteredStudents[x].phone !== 'undefined'){
				$http.get('http://localhost:3000/sendtext?to=' + $scope.filteredStudents[x].phone + '&message=' + message)
				 //$("[data-dismiss=modal]").trigger({ type: "click" });
			}
		}
		//set message back to null
		$scope.message = "";
	}

	//add graduated property to graduated students
	$scope.graduateClass = function(){
		for(var x= 0; x<$scope.filteredStudents.length; x++){
			var s = $scope.filteredStudents[x];
			for(var id in $scope.students){
				if(s.email == $scope.students[id].email){
					firebase.database().ref('student/' + id).update({
						graduated: true
					})
				}
			}

		}
	}


	//add byweeks (adds weeks onto start date in case
	//there's a week or two off like during a break)
	$scope.addBreak = function(weeks){
		// console.log(weeks);
		for(var x= 0; x<$scope.filteredStudents.length; x++){
			var s = $scope.filteredStudents[x];
			for(var id in $scope.students){
				if(s.email == $scope.students[id].email){

					startDate = $scope.students[id].date;
					startDate = new Date( startDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") );
					startDate = (startDate.setDate(startDate.getDate() + (weeks*7)));

					newStart = new Date(startDate);

					var dd = newStart.getDate();
					var mm = newStart.getMonth()+1; //January is 0!
					var yyyy = newStart.getFullYear();

					if(dd<10) {
					    dd='0'+dd
					} 

					if(mm<10) {
					    mm='0'+mm
					} 

					newStart = mm+'/'+dd+'/'+yyyy;

					console.log(newStart);

					firebase.database().ref('student/' + id).update({
						date: newStart,
						originaldate: $scope.students[id].date

					})
				}
			}

		}
	}

	// $scope.clearWeeks = function(){
	// 	$scope.breaktime.$setPristine();
	// }

	//initialize student id var
	var studentID;

	//get student id on selecting student
	$scope.hiringInfo = function(student){
		
		for(var id in $scope.students){
			if(student.email == $scope.students[id].email){
				studentID = id;
			}
		}
	}

	//TODO: REMOVE HARDCODED VALUES
	//DECIDE INFO TO RECORD FOR HIRED GRADS

	//create new section for hiring stuff
	$scope.updateHiringInfo = function(){
		//console.log(studentID);
		firebase.database().ref('student/' + studentID + '/hireinfo').set({
			employer:'Blue Rocket',
			title:'software dev',
			type:'full time',
			languages:'javascript, angular, ruby',
			collegedegree:'liberal arts',
			major:'english'
		})
	}

	//grab unique id from student email
	$scope.editStudentInfo = function(s){
		for(var id in $scope.students){
			if(s.email == $scope.students[id].email){
				studentID = id;
			}
		}
		$scope.editInfo = s;

	}

	//edit/update student info
	$scope.changeStudentInfo = function(s){
		console.log(s);
		firebase.database().ref('student/' + studentID).set({
			date: String(s.date),
			email: s.email,
			mentorEmail: s.mentorEmail,
			mentor: s.mentor,
			name: s.name,
			phone: s.phone,
			time: s.time
		})
	}

	$scope.createMentor = function(mentor){
		firebase.database().ref('mentor/' + mentor.firstname).set({
			firstname: mentor.firstname,
			lastname: mentor.lastname,
			email: mentor.email,
			phone: mentor.phone
		})
		//refresh page with updated mentors
		$scope.mentor = "";
		$window.location.href=("/#/admin");
	}

	//return to home page
	$scope.exit = function(){
		$window.location.href=("/#/home")
	}

 }])

.filter("removeDups", function(){
  return function(data) {
    if(angular.isArray(data)) {
      var result = [];
      var key = {};
      for(var i=0; i<data.length; i++) {
        var val = data[i];
        if(angular.isUndefined(key[val])) {
          key[val] = val;
          result.push(val);
        }
      }
      if(result.length > 0) {
        return result;
      }
    }
    return data;
  }  

})

//directive to convert undefined values in completed weeks to 'not done'
.filter('convertbool', ['$filter', function ($filter) {
  return function (bool) {
  	if(bool==true){
  		bool = "Done";
  	}else if(typeof bool == 'undefined' || bool == null || bool == ""){
  		bool = "Not done";
  	}else{
  		bool = bool;
  	}
    return bool;
  };
}])


.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
  	if(input==null){
  		input=0;
  	}
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);






