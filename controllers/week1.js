
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
	//get user name
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

	//get user firebase data
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
		//
		//OBJECT KEYS AND VALUES MUST BE NAMED THE SAME
		//TO BIND EASILY TO OBJECT IN FRONT END
		//

		//set firebase data with user's progress from checkboxes
		firebase.database().ref('student/' + user.uid + '/week1/').set({
			sendGoogleCode: getValue($scope.week1.sendGoogleCode),
			debugPico: getValue($scope.week1.debugPico),
			simpleReplica: getValue($scope.week1.simpleReplica),
			reading: getValue($scope.week1.reading),
			strictTheme : getValue($scope.week1.replicateStrictTheme),
			quiz: getValue($scope.week1.quiz),
			video: getValue($scope.week1.video),
			bonusHtml: getValue($scope.week1.bonusHtmlCss)
		})
	}

	//return to homepage
	$scope.exit = function(){
		$scope.submitWeek();
		$window.location.href = "/#/home"
	}

 
 }])



