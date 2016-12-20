angular.module('myApp.week15', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  .when('/chapter15.1', {
    templateUrl: 'views/chapter15/partials/work1.html',
    controller: 'WeekFifteenCtrl'
  })

  .when('/chapter15.2', {
    templateUrl: 'views/chapter15/partials/work2.html',
    controller: 'WeekFifteenCtrl'
  })

  .when('/chapter15.3', {
    templateUrl: 'views/chapter15/partials/work3.html',
    controller: 'WeekFifteenCtrl'
  })
}])

.controller('WeekFifteenCtrl', ['$scope','$http','$timeout','$window','chapterService', function($scope,$http, $timeout, $window, chapterService) {

	//initialize chapter11 obj
	$scope.chapter15 = {};

	//timeout function to give time
	//for each page to run digest cycle
	$timeout(function(){
		getData();	
	},250)
	
	//get user data	and call functions from 
	//factory services to return 
	//complete rate for the bar and the object for the current page
	function getData(){
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				$scope.user = user;
				chapterService.getUser($scope.user, 'chapter15').then(function(snapshot){
					$scope.$apply(function(){
						$scope.chapter15 = snapshot.val();
					})
				}).then(function(){
					chapterService.getCompleteRate($scope.user).then(function(snapshot){
						$scope.$apply(function(){
							$scope.userInfo = snapshot.val();
							$scope.completeRate = snapshot.val().progress;
						})
					})
				})	
			}else{
				console.log('fail')
			}
		})
	}
	
	//adjust progress bar on front end
	$scope.adjustProgress = function(num, isChecked){
		//if checked, increase, if not, decrease
		if(isChecked){
			$scope.completeRate += num;	
		}else{
			$scope.completeRate -= num;
		}	
	}
	
	//function to go to next page
	//dynamic instead of using hardcoded hrefs everywhere
	$scope.proceed = function(page){
		$scope.submitWeek();
		$window.location.href = "/#/" + page; 
	}

	//dynamically set the name of the next chapter in success
	//modal
	$scope.modalMe = function(newChapter){
		$scope.nextChapter = newChapter;
		//js for animation of badge
		  var badge = $('#badge'),
		    light = $('#light');

		    badge.hover(
		      function() {
		        if(!badge.data().active) {
		          badge.animate(
		          {
		            d: 180
		          }, 
		          {
		            duration: 300,
		            step: function( now ) {
		              badge.css ({
		                transform: "rotate(" + now + "deg)"
		              });
		            }
		          });
		        }
		      },
		      function() {
		        if(!badge.data().active) {
		          badge.animate(
		          {
		            d: 0
		          }, 
		          {
		            duration: 300,
		            step: function( now ) {
		              badge.css ({
		                transform: "rotate(" + now + "deg)"
		             });
		            }
		          });
		        }
		       }
		    );

		    badge.click(function() {
		      if(!badge.data().active) {
		        badge.animate(
		        {
		          d: 360
		        }, 
		        {
		          duration: 300,
		          step: function( now ) {
		            badge.css ({
		              transform: "rotate(" + now + "deg)"
		            });
		          }
		        });
		        light.css({
		          fill: '#05E0B1'
		        });
		        badge.data('active', true);
		      }
		      else {
		        light.css({
		              fill: "#4A4A4A"
		            });
		        badge.data('active', false);
		      }
	    	})
		}

	//submit data to firebase
	$scope.submitWeek = function(){
		var user = firebase.auth().currentUser;
		//set firebase data with user's progress from checkboxes
		firebase.database().ref('student/' + user.uid + '/chapter15/').set({
			beginnerProject: chapterService.getValue($scope.chapter15.beginnerProject, false),
			intermediateProject: chapterService.getValue($scope.chapter15.intermediateProject, false),
			advancedProject: chapterService.getValue($scope.chapter15.advancedProject, false)
		});

		//update complete rate
		firebase.database().ref('student/' + user.uid).update({
			progress: $scope.completeRate
		});
	}

	$scope.finishChapter = function(nextChapter){
		var user = firebase.auth().currentUser;

		//make sure not to set them back to a previous chapter
		//by using the highest last chapter they completed
		//as their current week
		nextChapter = Number(nextChapter);

		var nextWeek = nextChapter > $scope.userInfo.currentweek ? nextChapter: $scope.userInfo.currentweek;
		
		console.log(nextWeek)

		//update complete rate and set next chapter as 
		//starting point when they login
		firebase.database().ref('student/' + user.uid).update({	
			currentweek: nextWeek
		});

		$window.location.href = "/#/chapter16.1"; 
	}
 
 }]);