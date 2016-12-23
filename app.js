
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngAnimate',
  'youtube-embed',
  'ui.bootstrap',
  'ngYoutubeEmbed',
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
  'myApp.week12',
  'myApp.week13',
  'myApp.week14',
  'myApp.week15',
  'myApp.week16',
  'myApp.video'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}])

.service('chapterService', function(){

  //if user hasn't marked the box, return false
  //pass in bool 'isLink' to return an empty string 
  //instead of false value for an empty link
  this.getValue = function(week, isLink){
    if(typeof week == 'undefined' && !isLink || week == null && !isLink){
      return false;
    }else if(week == 'undefined' && isLink || week == null && isLink){
      return '';
    }else{
      return week;
    }
  }

  //get chapter object to populate page
  this.getUser = function(user, chapter){
    return firebase.database().ref('student/' + user.uid + '/' + chapter +'/').once('value')
  }


  //must always grab progress bar value
  this.getCompleteRate = function(user){
    return firebase.database().ref('student/' + user.uid).once('value');
  }

})







