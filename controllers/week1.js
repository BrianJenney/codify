
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

	$scope.exit = function(){
		console.log("working")
		$window.location.href = "/#/home"
	}



	
 
 }])



