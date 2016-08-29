angular.module('myApp.week12', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week12', {
    templateUrl: 'views/week12.html',
    controller: 'Week12Ctrl'
  });
}])

.controller('Week12Ctrl', ['$scope',function($scope) {
 
 }]);