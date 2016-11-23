
angular.module('myApp.week1', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chapter1', {
    templateUrl: 'views/chapter1/quiz.html',
    controller: 'WeekOneCtrl'
  });
}])


.controller('WeekOneCtrl',['$scope','$http','$timeout','$window','quizFactory', function($scope,$http, $timeout, $window, quizFactory) {
	
	//initialize week 1 obj
	$scope.chapter1 = {};

	getData();
	//get user name
	function getData(){
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				console.log('hey')
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



	//get user firebase data
	function getUser(user){
	return firebase.database().ref('student/' + user.uid + '/chapter1/').once('value').then(function(snapshot){
			$scope.$apply(function(){
				$scope.chapter1 = snapshot.val();
				//reinitialize object if null
				//will be null when first called
				if($scope.chapter1 == null){
					$scope.chapter1 = {};
				}
			})
		})
	}
	
	// //submit data to firebase
	// $scope.submitWeek = function(){
	// 	var user = firebase.auth().currentUser;
	// 	//if user hasn't marked the box, return false
	// 	function getValue(week){
	// 		if(week == 'undefined' || week == null){
	// 			return false;
	// 		}else{
	// 			return week;
	// 		}
	// 	}
	// 	//
	// 	//OBJECT KEYS AND VALUES MUST BE NAMED THE SAME
	// 	//TO BIND EASILY TO OBJECT IN FRONT END
	// 	//

	// 	//set firebase data with user's progress from checkboxes
	// 	firebase.database().ref('student/' + user.uid + '/week1/').set({
	// 		sendGoogleCode: getValue($scope.week1.sendGoogleCode),
	// 		debugPico: getValue($scope.week1.debugPico),
	// 		simpleReplica: getValue($scope.week1.simpleReplica),
	// 		reading: getValue($scope.week1.reading),
	// 		strictTheme : getValue($scope.week1.replicateStrictTheme),
	// 		quiz: getValue($scope.week1.quiz),
	// 		video: getValue($scope.week1.video),
	// 		bonusHtml: getValue($scope.week1.bonusHtmlCss)
	// 	})
	// }

	//return to homepage
	$scope.exit = function(){
		$scope.submitWeek();
		$window.location.href = "/#/home"
	}

 
 }])

.directive('quiz', function(quizFactory, $window) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'views/chapter1/challenges/codequiz.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			};

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					console.log("working");
					console.log(scope.score)
					console.log(quizFactory.getLength())

					//make sure user gets at least 70% correct
					//update progress bar 
					if((scope.score/quizFactory.getLength())>.7){
						var user = firebase.auth().currentUser;
						firebase.database().ref('student/' + user.uid).update({
						progress: 10
						});

						// //set firebase data with user's progress from checkboxes
						firebase.database().ref('student/' + user.uid + '/chapter1/').set({
							quiz: true 
						})

						$window.location.href="/#/chapter2";
					}else{
						scope.quizOver = true;	
					}
					
				}
			};

			scope.checkAnswer = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();

				if(ans == scope.options[scope.answer]) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}

				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
})

.factory('quizFactory', function() {
	var questions = [
		{
			question: "What is HTML",
			options: ["1", "2", "3", "4"],
			answer: 0
		},
		{
			question: "What is css?",
			options: ["1", "2", "3", "4"],
			answer: 0
		},
		{
			question: "What's front-end?",
			options: ["1", "2", "3", "4"],
			answer: 0
		},
		{
			question: "Which is a link tag?",
			options: ["1", "2", "3", "4"],
			answer: 0
		},
		{	
			question: "What's a header tag?",
			options: ["1", "2", "3", "4"],
			answer: 0
		}
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		},

		getLength : function(){
			return questions.length;
		}
	};
});



function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  //  document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  //  document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}