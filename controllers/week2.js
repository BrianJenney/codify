angular.module('myApp.week2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider

  .when('/chapter2.1', {
    templateUrl: 'views/chapter2/partials/work1.html',
    controller: 'WeekTwoCtrl'
  })

  .when('/chapter2.2', {
    templateUrl: 'views/chapter2/partials/work2.html',
    controller: 'WeekTwoCtrl'
  })

  .when('/chapter2.3', {
    templateUrl: 'views/chapter2/partials/work3.html',
    controller: 'WeekTwoCtrl'
  })
}])


.controller('WeekTwoCtrl', ['$scope','$http','$timeout','$window','chapterService', function($scope,$http, $timeout, $window, chapterService) {

	//initialize chapter2 obj
	$scope.chapter2 = {};

	getData();
	//get user data	
	function getData(){
		firebase.auth().onAuthStateChanged(function(user){
			if(user){
				getUser(user);
				getCompleteRate(user);
			}else{
				console.log('fail')
			}
		})
	}
	

	//must always grab progress bar value
	function getCompleteRate(user){
	firebase.database().ref('student/' + user.uid).once('value').then(function(snapshot){
			$scope.$apply(function(){
				$scope.completeRate = snapshot.val().progress;
				})
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
	
	//get chapter object to populate page
	function getUser(user){
	firebase.database().ref('student/' + user.uid + '/chapter2/').once('value').then(function(snapshot){
			$scope.$apply(function(){
				//timeout to give page time to finish
				//digest cycle and reload the object for the 
				//page
				$timeout(function(){
					$scope.chapter2 = snapshot.val();
					//reinitialize object if null
					//will be null when first called
					if($scope.chapter2 == null){
						$scope.chapter2 = {};
					}
				},500)
				
			})
		})
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
		firebase.database().ref('student/' + user.uid + '/chapter2/').set({
			beginnerProject: chapterService.getValue($scope.chapter2.beginnerProject, false),
			intermediateProject: chapterService.getValue($scope.chapter2.intermediateProject, false),
			advancedProject: chapterService.getValue($scope.chapter2.advancedProject, false)
		});

		//update complete rate
		firebase.database().ref('student/' + user.uid).update({
			progress: $scope.completeRate
		});
	}
 
 }]);