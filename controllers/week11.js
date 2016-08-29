angular.module('myApp.week11', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week11', {
    templateUrl: 'views/week11.html',
    controller: 'Week11Ctrl'
  });
}])

.controller('Week11Ctrl', ['$scope',function($scope) {
 
 }]);