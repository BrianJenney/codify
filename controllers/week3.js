angular.module('myApp.week3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week3', {
    templateUrl: 'views/week3.html',
    controller: 'Week3Ctrl'
  });
}])

.controller('Week3Ctrl', ['$scope',function($scope) {
 
 }]);