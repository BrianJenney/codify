angular.module('myApp.week6', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week6', {
    templateUrl: 'views/week6.html',
    controller: 'Week6Ctrl'
  });
}])

.controller('Week1Ctrl', ['$scope',function($scope) {
 
 }]);