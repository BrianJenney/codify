angular.module('myApp.week2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  .when('/chapter2.1', {
    templateUrl: 'views/chapter2/partials/work1.html',
    controller: 'WeekTwoCtrl'
  })

  .when('/chapter2.2', {
    templateUrl: 'views/chapter2/partials/work2.html',
    controller: 'WeekTwoCtrl'
  })

  .when('/chapter2.3', {
    templateUrl: 'views/chapter2/partials/work3.html',
    controller: 'WeekTwoCtrl'
  })
}])


.controller('WeekTwoCtrl', ['$scope','$http','$timeout','$window','chapterService', function($scope,$http, $timeout, $window, chapterService) {
	
	//initialize week 1 obj
	$scope.chapter2 = {};

	getData();
	//get user data	
	function getData(){
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				getUser(user);
				getCompleteRate(user);
			}else{
				console.log('fail')
			}
		})
	}

	//must always grab progress bar value
	function getCompleteRate(user){
	return firebase.database().ref('student/' + user.uid).once('value').then(function(snapshot){
			$scope.$apply(function(){
				$scope.completeRate = snapshot.val().progress;
				})
			})
		}

	//adjust progress bar on front end
	$scope.adjustProgress = function(num, isChecked){
		//if checked, increase, if not, decrease
		if(isChecked){
			$scope.completeRate += num;	
		}else{
			$scope.completeRate -= num;
		}
		
	}
	
	//get complete rate on every page
	//may want to refactor into service
	function getUser(user){
	return firebase.database().ref('student/' + user.uid + '/week2/').once('value').then(function(snapshot){
			$scope.$apply(function(){
				//timeout to give page time to finish
				//digest cycle and reload the object for the 
				//page
				$timeout(function(){
					$scope.chapter2 = snapshot.val();
					//reinitialize object if null
					//will be null when first called
					if($scope.chapter2 == null){
						$scope.chapter2 = {};
					}
				},500)
				
			})
		})
	}
	
	$scope.proceed = function(page){
		$scope.submitWeek();
		$window.location.href = "/#/" + page; 
	}

	//TODO: remove this function and use proceed instead
	//return to homepage
	$scope.exit = function(){
		$scope.submitWeek();
		$window.location.href = "/#/home"
	}

	//if user hasn't marked the box, return false
	//pass in bool 'isLink' to return an empty string 
	//instead of false value for an empty link
	function getValue(week, isLink){
		if(typeof week == 'undefined' && !isLink || week == null && !isLink){
			return false;
		}else if(week == 'undefined' && isLink || week == null && isLink){
			return '';
		}else{
			return week;
		}
	}

	//submit data to firebase
	$scope.submitWeek = function(){
		var user = firebase.auth().currentUser;
		//set firebase data with user's progress from checkboxes
		firebase.database().ref('student/' + user.uid + '/week2/').set({
			beginnerProject: getValue($scope.chapter2.beginnerProject, false),
			intermediateProject: getValue($scope.chapter2.intermediateProject, false),
			advancedProject: getValue($scope.chapter2.advancedProject, false)
		});

		//update complete rate
		firebase.database().ref('student/' + user.uid).update({
			progress: $scope.completeRate
		});
	}
 
 }]);