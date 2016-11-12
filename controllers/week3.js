angular.module('myApp.week3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week3', {
    templateUrl: 'views/week3.html',
    controller: 'Week3Ctrl'
  });
}])


.controller('Week3Ctrl', ['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {

	//initialize week obj
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
		firebase.database().ref('student/' + user.uid + '/week3/').set({
			githubOJlink: getLinkValue($scope.week3.githubOJlink),
			replicateOj: getValue($scope.week3.replicateOj),
			gitHubLiquidGem: getLinkValue($scope.week3.gitHubLiquidGem),
			replicateLiquidGem: getValue($scope.week3.replicateLiquidGem),
			gitHubLinkFlat: getLinkValue($scope.week3.gitHubLinkFlat),
			quiz: getValue($scope.week3.quiz),
			video: getValue($scope.week3.video),
			bonusReading: getValue($scope.week3.bonusReading),
			bonusShayHowe: getValue($scope.week3.bonusShayHowe)
		})
	}


 
 }]);