angular.module('myApp.week2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week2', {
    templateUrl: 'views/week2.html',
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
				console.log('hey')
				getUser(user);

			}else{
				console.log('fail')
			}
		})
	}

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
	
	var clicks = 0;
	//show and hide functions for hidden content
	$(document).on('click','.help', function(){
		if(clicks == 0){
			$(this).parent().parent().next().css({'display':'block','transition':'2s'});			
			clicks++;
		}else{
			$(this).parent().parent().next().css({'display':'none'})
			clicks--;
		}
	})
	$(document).on('click','.closeme', function(){
		$(this).parent().css({'display':'none'})
	})
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
			sendGoogleCode: getValue($scope.week2.sendGoogleCode),
			debugPico: getValue($scope.week2.debugPico),
			simpleReplica: getValue($scope.week2.simpleReplica),
			reading: getValue($scope.week2.reading),
			quiz: getValue($scope.week2.quiz)
		})
	}






	/////////////
 
 }]);