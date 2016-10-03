angular.module('myApp.admin', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/admin', {
    templateUrl: 'views/admin.html',
    controller: 'AdminCtrl'
  });
}])

.controller('AdminCtrl', ['$scope','$filter', '$window','filterFilter',function($scope, $filter, $window, filterFilter) {

	$scope.search = {};
	//initialize array for dropdown of mentors
	$scope.mentors = ['Isaac','Brian','Chris']
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
			$scope.studentArray.push(value);

			
			for(x=0; x<$scope.studentArray.length; x++){
				//initialize count
				var count = 0;
				//get number of booleans set to true in week object
				for(var key in $scope.studentArray[x].week1){
					if($scope.studentArray[x].week1[key] == true){
						count++
					}

				//get percentage of week length divided by
				//number of completed assignments
				$scope.studentArray[x].week1CompleteRate = count/Object.keys($scope.studentArray[x].week1).length
					}
				}
			})
		})
	})

	//return to home page
	$scope.exit = function(){
		$window.location.href=("/#/home")
	}


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

.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);


// var sameObject = function(object, name){
// 	name = {};
// 	for(var key in object){
// 		name[key] = object[key];
// 	}
// 	console.log(name)
// }

// var test = {buyer: 'Brian', name: 'Jim', job: 'Doer'}

// sameObject(test, 'yo')

// var students = ['harry','johnny','joe']

// var name = 'joe'

// var isStudentHere = function(students, name){
// 	console.log(students)
// 	console.log(name)
// 	for(x=0; x<students.length; x++){
// 		if (students[x] = name.toString()){
// 			return name
// 			break;
// 		}else{
// 			return false
// 		}
// 	}
// }

// console.log(isStudentHere(students, name));



