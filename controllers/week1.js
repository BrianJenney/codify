
angular.module('myApp.week1', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week1', {
    templateUrl: 'views/week1.html',
    controller: 'WeekOneCtrl'
  });
}])

.controller('WeekOneCtrl',['$scope','$http','$timeout',function($scope,$http, $timeout) {

	
	$(document).on('click','.help', function(){
		$(this).parent().parent().next().css({'display':'block'})

	})

	$(document).on('click','.closeme', function(){
		$(this).parent().css({'display':'none'})
	})

	
 
 }])



