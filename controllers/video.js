
angular.module('myApp.video', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/video', {
    templateUrl: 'views/video.html',
    controller: 'VideoCtrl'
  });
}])

.controller('VideoCtrl',['$scope','$http','$timeout','$window', function($scope,$http, $timeout, $window) {
	
	//TEST -- dynamically set the completion rate
	$scope.completeRate = 0;

	$scope.introVideo = "https://www.youtube.com/embed/grWNUIbSc8k?autoplay=1";

	//play video as soon as player api is ready
	$scope.$on('youtube.player.ready', function($event, player){
		player.playVideo();
	})

	//re-direct user to first assigment
	$scope.$on('youtube.player.ended', function ($event, player) {
	    
	    $window.location.href="/#/chapter1";
	})
	
 
 }])



