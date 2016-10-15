angular.module('myApp.week3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week3', {
    templateUrl: 'views/week3.html',
    controller: 'Week3Ctrl'
  });
}])


.controller('Week3Ctrl', ['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {

	//initialize week 1 obj
	$scope.week3 = {};

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
	return firebase.database().ref('student/' + user.uid + '/week3/').once('value').then(function(snapshot){
			$scope.$apply(function(){
				$scope.week3 = snapshot.val();
				console.log($scope.week3);
				//reinitialize object if null
				//will be null when first called
				if($scope.week3 == null){
					$scope.week3 = {};
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
		console.log('working')
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
		firebase.database().ref('student/' + user.uid + '/week3/').set({
			sendGoogleCode: getValue($scope.week3.sendGoogleCode),
			debugPico: getValue($scope.week3.debugPico),
			simpleReplica: getValue($scope.week3.simpleReplica),
			reading: getValue($scope.week3.reading),
			quiz: getValue($scope.week3.quiz)
		})
	}






	/////////////
 
 }]);