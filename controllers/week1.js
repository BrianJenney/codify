
angular.module('myApp.week1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week1', {
    templateUrl: 'views/week1.html',
    controller: 'Week1Ctrl'
  });
}])

.controller('Week1Ctrl', ['$scope',function($scope) {
 
 }]);
