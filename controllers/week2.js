angular.module('myApp.week2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week2', {
    templateUrl: 'views/week2.html',
    controller: 'Week2Ctrl'
  });
}])

.controller('Week2Ctrl', ['$scope',function($scope) {
 
 }]);