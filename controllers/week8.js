angular.module('myApp.week8', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week8', {
    templateUrl: 'views/week1.html',
    controller: 'Week8Ctrl'
  });
}])

.controller('Week8Ctrl', ['$scope',function($scope) {
 
 }]);