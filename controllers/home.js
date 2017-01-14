angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$window','$timeout',function($scope,$window,$timeout) {


//get current user to determine if admin
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $scope.email = user.email;
  } else {
    console.log("nope")
  }

  //needs timeout to allow page to render first
  $timeout(function(){
  	//if user email is mine then you're the admin
    if(user.email === 'brianjenney83@gmail.com' || user.email === 'mattbrody@codify.com' || user.email === 'isaac@codfiyacademy.com' || user.email === 'Philipp.schulte@ymail.com'){
    	$scope.isAdmin = true;
    }else{
    	$scope.isAdmin = false;
    }
  },250)

});

  //function to get week completion rate
  function getCompleteRate(week){
    if(week == null || week == 'undefined'){
      return 0
    }else{
      var count = 0;
      for(var key in week){
        //count all true fields and url inputs
        if(week[key]==true || week[key].length > 0){
          count++
        }
      }
      return count/Object.keys(week).length
    }
  }
  //initialize array to store student object
  $scope.studentArray = [];
  //retrieve firebase data for students
  firebase.database().ref('student/').once('value').then(function(snapshot){
      //find the current user's id from their email
      for(var x in snapshot.val()){
        if(snapshot.val()[x].email == $scope.email){
          $scope.userID = x;
        }
      }
      //get complete rate to see what chapter's they should have access to
    }).then(function(){
      firebase.database().ref('student/' + $scope.userID).once('value').then(function(snapshot){
        var thisUser = snapshot.val();

        $scope.$apply(function(){
          $scope.ch1 = getCompleteRate(thisUser.chapter1);
          $scope.ch2 = getCompleteRate(thisUser.chapter2);
          $scope.ch3 = getCompleteRate(thisUser.chapter3);
          $scope.ch4 = getCompleteRate(thisUser.chapter4);
          $scope.ch5 = getCompleteRate(thisUser.chapter5);
          $scope.ch6 = getCompleteRate(thisUser.chapter6);
          $scope.ch7 = getCompleteRate(thisUser.chapter7);
          $scope.ch8 = getCompleteRate(thisUser.chapter8);
          $scope.ch9 = getCompleteRate(thisUser.chapter9);
          $scope.ch10 = getCompleteRate(thisUser.chapter10);
          $scope.ch11 = getCompleteRate(thisUser.chapter11);
          $scope.ch12 = getCompleteRate(thisUser.chapter12);
          $scope.ch13 = getCompleteRate(thisUser.chapter13);
          $scope.ch14 = getCompleteRate(thisUser.chapter14);
          $scope.ch15 = getCompleteRate(thisUser.chapter15);
          $scope.ch16 = getCompleteRate(thisUser.chapter16);
        })
        

        console.log($scope.ch1);
      })
    })

  

 
 $scope.logOut = function(){
 	firebase.auth().signOut().then(function() {
 		$window.location.href = "/#/login"
	}, function(error) {
	  console.log(error);
	});
 }

 }]);