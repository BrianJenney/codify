
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.admin',
  'myApp.login',
  'myApp.createuser',
  'myApp.week1',
  'myApp.week2',
  'myApp.week3',
  'myApp.week4',
  'myApp.week5',
  'myApp.week6',
  'myApp.week7',
  'myApp.week8',
  'myApp.week9',
  'myApp.week10',
  'myApp.week11',
  'myApp.week12'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);






