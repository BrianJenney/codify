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
$scope.removeHw = function(index){
	$scope.homework.splice(index,1);
}

//functions for assignments
$scope.assignments = [];
$scope.addAssign = function(title, work){
	$scope.assignments.push({"title": title, "desc": work})
}

$scope.removeAssignment = function(index){
	$scope.assignments.splice(index,1);
}

//functions for videolinks
$scope.links = [];
$scope.addVideoLink = function(url){
	$scope.links.push({"url": url})
	delete $scope.links.$$hashkey;
}

$scope.removeLink = function(index){
	$scope.links.splice(index,1);
}

//submit info for the week to firebase

$scope.submit = function(){
	console.log($scope.homework, $scope.links, $scope.assignments)
	console.log($scope.selectedWeek);
	firebase.database().ref("week" + $scope.selectedWeek).push({
		"homeworklinks": angular.fromJson(angular.toJson($scope.homework)),
		"videos":angular.fromJson(angular.toJson($scope.links)),
		"assignments": angular.fromJson(angular.toJson($scope.assignments))
	})
	
	}
 
 }]);

