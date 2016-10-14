angular.module('myApp.week4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week4', {
    templateUrl: 'views/week4.html',
    controller: 'Week4Ctrl'
  });
}])


.controller('Week4Ctrl', ['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {

	//initialize week 1 obj
	$scope.week4 = {};

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
	return firebase.database().ref('student/' + user.uid + '/week4/').once('value').then(function(snapshot){
			$scope.$apply(function(){
				$scope.week4 = snapshot.val();
				console.log($scope.week4);
				//reinitialize object if null
				//will be null when first called
				if($scope.week4 == null){
					$scope.week4 = {};
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
		firebase.database().ref('student/' + user.uid + '/week/').set({
			sendGoogleCode: getValue($scope.week4.sendGoogleCode),
			debugPico: getValue($scope.week4.debugPico),
			simpleReplica: getValue($scope.week4.simpleReplica),
			reading: getValue($scope.week4.reading),
			quiz: getValue($scope.week4.quiz)
		})
	}






	/////////////
 
 }]);