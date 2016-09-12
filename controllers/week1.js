
angular.module('myApp.week1', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/week1', {
    templateUrl: 'views/week1.html',
    controller: 'WeekOneCtrl'
  });
}])

.controller('WeekOneCtrl',['$scope','$http','$timeout',function($scope,$http, $timeout) {


	//retrieve firebase data
	$http.get("https://codify-afedf.firebaseio.com/week1.json")
	.then(function(response){
		
		//assign the child scope values to arrays to iterate
		// on the front end
		//probably a better way to do this
		angular.forEach(response.data, function(key, value){
			//console.log(key)

			$scope.assignments = key.assignments;
			$scope.homeworkLinks = key.homeworkLinks;
			$scope.videos = key.videos;
			
		})
	})

$scope.file = document.getElementById("files").files[0];

//function to save file
	$scope.saveFile = function(){

	  var storage = firebase.storage();

	  var file = document.getElementById("files").files[0];
	    //console.log(file);

	    if(file !== undefined){
	    	var storageRef = firebase.storage().ref();
	  
		  //dynamically set reference to the file name
		  var thisRef = storageRef.child(file.name);


		  //put request upload file to firebase storage
		  
		  	thisRef.put(file).then(function(snapshot) {
		    console.log('Uploaded a blob or file!');
		    var fileUpload = true;

		    	//boolean to make sure this function occurs
		    	//synchronously
			    if(fileUpload == true){
				  	thisRef.getDownloadURL().then(function(url) {
			  		console.log(url);
					})
			  	}
			  	//NEEDS TO BE DONE///
			  	//add url to firebase for the student with 
			  	//assignment name included
			  	/////////////////////
			})
		  
			

	    }else{
	    	console.log("not working");
	    	$scope.noFile = true;
	    }
	  
	  

  }
 
 }])



