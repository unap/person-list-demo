angular.module('myApp.controllers', ['ngRoute'])

.controller('MainCtrl', function ($scope, $route, $routeParams, $http, $sce, $location) {
  $scope.foo = "moo";
});