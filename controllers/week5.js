angular.module('myApp.week5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week5', {
    templateUrl: 'views/week5.html',
    controller: 'Week5Ctrl'
  });
}])


.controller('Week5Ctrl', ['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {

	//initialize week 1 obj
	$scope.week5 = {};

	getData();
	//get user data	
	function getData(){
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				getUser(user);

			}else{
				console.log('fail')
			}
		})
	}

	function getUser(user){
	return firebase.database().ref('student/' + user.uid + '/week5/').once('value').then(function(snapshot){
			$scope.$apply(function(){
				$scope.week5 = snapshot.val();
				console.log($scope.week5);
				//reinitialize object if null
				//will be null when first called
				if($scope.week5 == null){
					$scope.week5 = {};
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
		firebase.database().ref('student/' + user.uid + '/week5/').set({
			gitHubBootstrapLink: getLinkValue($scope.week5.gitHubBootstrapLink),
			sendBootstrap: getValue($scope.week5.sendBootstrap),
			codecademyJquery: getValue($scope.week5.codecademyJquery),
			videos: getValue($scope.week5.videos),
			gitHubBonusBootstrap: getLinkValue($scope.week5.gitHubBonusBootstrap),
			sendBonusBootstrap: getValue($scope.week5.sendBonusBootstrap),
			bonusJquery: getValue($scope.week5.bonusJquery)
			
		})
	}

 
 }]);