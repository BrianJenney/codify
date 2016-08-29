angular.module('myApp.week9', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week9', {
    templateUrl: 'views/week9.html',
    controller: 'Week1Ctrl'
  });
}])

.controller('Week9Ctrl', ['$scope',function($scope) {
 
 }]);