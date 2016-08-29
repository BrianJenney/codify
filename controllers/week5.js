angular.module('myApp.week5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week5', {
    templateUrl: 'views/week5.html',
    controller: 'Week5Ctrl'
  });
}])

.controller('Week5Ctrl', ['$scope',function($scope) {
 
 }]);