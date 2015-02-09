'use strict';

angular.module('myApp.routes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', 
      {
      templateUrl: 'views/personlist.html',
      controller: 'MainCtrl'
      })
    .otherwise({ redirectTo: '/' });
}]);