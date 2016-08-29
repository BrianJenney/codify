angular.module('myApp.week7', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week7', {
    templateUrl: 'views/week7.html',
    controller: 'Week7Ctrl'
  });
}])

.controller('Week7Ctrl', ['$scope',function($scope) {
 
 }]);