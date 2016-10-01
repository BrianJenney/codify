angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminCtrl'
  });
}])

.controller('AdminCtrl', ['$scope','$filter',function($scope, $filter) {

	//initialize array to store student object
	$scope.studentArray = [];

	//retrieve firebase data for students
	firebase.database().ref('student/').once('value').then(function(snapshot){

		//console.log(snapshot.val())

		$scope.students = snapshot.val();

		//get object from id key of student
		angular.forEach($scope.students, function(value, key){
		//console.log(value)
		$scope.student = value;
		$scope.$apply(function(){
			$scope.studentArray.push(value)
		})
		

		})
		console.log($scope.studentArray)
	})
 
 }])

.filter("removeDups", function(){
  return function(data) {
    if(angular.isArray(data)) {
      var result = [];
      var key = {};
      for(var i=0; i<data.length; i++) {
        var val = data[i];
        if(angular.isUndefined(key[val])) {
          key[val] = val;
          result.push(val);
        }
      }
      if(result.length > 0) {
        return result;
      }
    }
    return data;
  }
})



