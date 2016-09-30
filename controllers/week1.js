
angular.module('myApp.week1', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week1', {
    templateUrl: 'views/week1.html',
    controller: 'WeekOneCtrl'
  });
}])

.controller('WeekOneCtrl',['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {
	
	//initialize week 1 obj
	$scope.week1 = {};

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
	return firebase.database().ref('student/' + user.uid + '/week1/').once('value').then(function(snapshot){

			$scope.$apply(function(){
				$scope.week1 = snapshot.val();
				console.log($scope.week1);
				//reinitialize object if null
				//will be null when first called
				if($scope.week1 == null){
					$scope.week1 = {};
				}
			})
				

			})
	}
	
	//initialize onclick var for opening and closing hidden content
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
		$window.location.href = "/#/home"
	}

	//submit data to firebase
	$scope.submitWeek = function(){

		console.log($scope.week1)
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
		firebase.database().ref('student/' + user.uid + '/week1/').set({
			sendGoogleCode: getValue($scope.week1.sendGoogleCode),
			debugPico: getValue($scope.week1.debugPico),
			simpleReplica: getValue($scope.week1.simpleReplica)
		})
	}

 
 }])



