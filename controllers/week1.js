
angular.module('myApp.week1', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week1', {
    templateUrl: 'views/week1.html',
    controller: 'WeekOneCtrl'
  });
}])

.controller('WeekOneCtrl',['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {


	$(document).on('click','.help', function(){
		$(this).parent().parent().next().css({'display':'block'})

	})

	$(document).on('click','.closeme', function(){
		$(this).parent().css({'display':'none'})
	})

	//initialize empty object for week 1
	$scope.week1 = {};

	$scope.exit = function(){
		$window.location.href = "/#/home"
	}

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
			googleReplica: getValue($scope.week1.sendGoogleCode),
			debugPico: getValue($scope.week1.sendDebugPico),
			simpleReplica: getValue($scope.week1.sendSimpleReplica)
		})
	}



	
 
 }])



