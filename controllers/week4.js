angular.module('myApp.week4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week4', {
    templateUrl: 'views/week4.html',
    controller: 'Week4Ctrl'
  });
}])


.controller('Week4Ctrl', ['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {

	//initialize week obj
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

		//return empty string instead of false for links/text inputs
		function getLinkValue(week){
			if(week == 'undefined' || week == null){
				return '';
			}else{
				return week;
			}
		}
		//set firebase data with user's progress from checkboxes
		firebase.database().ref('student/' + user.uid + '/week4/').set({
			gitHubGoogleResponsive: getLinkValue($scope.week4.gitHubGoogleResponsive),
			sendResponsiveGoogleCode: getValue($scope.week4.sendResponsiveGoogleCode),
			gitHubOrangeResponsive: getLinkValue($scope.week4.gitHubOrangeResponsive),
			sendResponsiveOrange: getValue($scope.week4.sendResponsiveOrange),
			quiz: getValue($scope.week4.quiz),
			videos: getValue($scope.week4.videos)
		})
	}

 
 }]);