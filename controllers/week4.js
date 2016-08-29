angular.module('myApp.week4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week4', {
    templateUrl: 'views/week4.html',
    controller: 'Week4Ctrl'
  });
}])

.controller('Week4Ctrl', ['$scope',function($scope) {
 
 }]);