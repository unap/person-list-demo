'use strict';


var app = angular.module('myApp', [
  'ui.bootstrap',
  'myApp.controllers'
]);

app.filter('numberFixedLen', function () {
  return function(a,b){
    return(1e4+a+"").slice(-b)
  }
});