angular.module('myApp.week16', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  .when('/chapter16.1', {
    templateUrl: 'views/chapter16/partials/work1.html',
    controller: 'WeekSixteenCtrl'
  })

  .when('/chapter16.2', {
    templateUrl: 'views/chapter16/partials/work2.html',
    controller: 'WeekSixteenCtrl'
  })

  .when('/chapter16.3', {
    templateUrl: 'views/chapter16/partials/work3.html',
    controller: 'WeekSixteenCtrl'
  })
}])

.controller('WeekSixteenCtrl', ['$scope','$http','$timeout','$window','chapterService', function($scope,$http, $timeout, $window, chapterService) {

	//initialize chapter11 obj
	$scope.chapter16 = {};
	$scope.nav16= true;
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
				chapterService.getUser($scope.user, 'chapter16').then(function(snapshot){
					$scope.$apply(function(){
						$scope.chapter16 = snapshot.val();
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
		if($scope.chapter16 !== null){
			firebase.database().ref('student/' + user.uid + '/chapter16/').set({
				loginapp: chapterService.getValue($scope.chapter16.loginapp, false),
				loginappURL: chapterService.getValue($scope.chapter16.loginappURL, true)
			});
		}

		//update complete rate
		firebase.database().ref('student/' + user.uid).update({
			progress: $scope.completeRate
		});
	}

	$scope.finishChapter = function(nextChapter){
		var user = firebase.auth().currentUser;
		$scope.submitWeek();
		//make sure not to set them back to a previous chapter
		//by using the highest last chapter they completed
		//as their current week
		nextChapter = Number(nextChapter);

		var nextWeek = nextChapter > $scope.userInfo.currentweek ? nextChapter: $scope.userInfo.currentweek;
		

		//update complete rate and set next chapter as 
		//starting point when they login
		firebase.database().ref('student/' + user.uid).update({	
			currentweek: nextWeek
		});

		$window.location.href = "/#/chapter17.1"; 
	}

	$scope.openNav = function() {
	    document.getElementById("mySidenav").style.width = "250px";
	    document.getElementById("main").style.marginLeft = "250px";
	}

	/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
	$scope.closeNav = function() {
	    document.getElementById("mySidenav").style.width = "0";
	    document.getElementById("main").style.marginLeft = "0";
	}
 
 }]);