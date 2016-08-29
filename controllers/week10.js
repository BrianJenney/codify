angular.module('myApp.week10', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week10', {
    templateUrl: 'views/week10.html',
    controller: 'Week10Ctrl'
  });
}])

.controller('Week10Ctrl', ['$scope',function($scope) {
 
 }]);