angular.module('myApp.week2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chapter2', {
    templateUrl: 'views/chapter2/chapter2.html',
    controller: 'WeekTwoCtrl'
  });
}])


.controller('WeekTwoCtrl', ['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {

	//initialize week 1 obj
	$scope.week2 = {};

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
				console.log(snapshot.val());
				$scope.completeRate = snapshot.val().progress;
				})
			})
		}
	

	//get complete rate on every page
	//may want to refactor into service
	function getUser(user){
	return firebase.database().ref('student/' + user.uid + '/week2/').once('value').then(function(snapshot){
			$scope.$apply(function(){
				$scope.week2 = snapshot.val();
				console.log($scope.week1);
				//reinitialize object if null
				//will be null when first called
				if($scope.week2 == null){
					$scope.week2 = {};
				}
			})
		})
	}
	
	//return to homepage
	$scope.exit = function(){
		$scope.submitWeek();
		$window.location.href = "/#/home"
	}
	//submit data to firebase
	$scope.submitWeek = function(){
		var user = firebase.auth().currentUser;
		//if user hasn't marked the box, return false
		function getValue(week){
			if(week == 'undefined' || week == null){
				return false;
			}else{
				return week;
			}
		}
		//set firebase data with user's progress from checkboxes
		firebase.database().ref('student/' + user.uid + '/week2/').set({
			visualArts: getValue($scope.week2.visualArts),
			myFolio: getValue($scope.week2.myFolio),
			metroApp: getValue($scope.week2.metroApp),
			debugMyFolio: getValue($scope.week2.debugMyFolio),
			video: getValue($scope.week2.video),
			quiz: getValue($scope.week2.quiz),
			bonusGitHub: getValue($scope.week2.bonusGitHub),
			bonusReading: getValue($scope.week2.bonusReading),
			githubLink: getValue($scope.week2.githubLink)
		})
	}
 
 }]);