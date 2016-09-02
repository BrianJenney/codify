angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminCtrl'
  });
}])

.controller('AdminCtrl', ['$scope',function($scope) {

//initialize array for weeks
$scope.weeks =[];
//create dropdown values for weeks
for(i=1; i<=16; i++){
	$scope.weeks.push({"week":'Week' + i, "value": i})
}

//push homework to array
$scope.homework = [];

//add homework to array
$scope.addHomework = function(work){
	$scope.homework.push(work)
	//console.log($scope.homework)
}

//remove homework from array
$scope.remove = function(index){
	$scope.homework.splice(index,1);
}


 
 }]);

