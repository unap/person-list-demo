angular.module('myApp.controllers', ['ngRoute'])

.controller('MainCtrl', function ($scope, $route, $routeParams, $http, $sce, $location) {
  $scope.personlist = null;

  $http.get('data/personlist.json')
    .success(function (data) {
      $scope.personlist = data;
      $scope.personlist.forEach(function(person) {
        date = new Date(person.dob);
        person.day = date.getDate();
        person.month = date.getMonth();
        person.year = date.getFullYear();
        person.socialid = formSocialID(person.day, person.month, person.year, person.postfix);
        delete person.dob;
      });
    });

    $scope.foo = function() {
      console.log("foo");
    }

    $scope.editPerson = function(person) {
      if (person) console.log("Edit person: "+person.last_name+" "+person.first_name);
      $('#modal').fadeIn(150);
      $scope.editedperson = jQuery.extend({}, person); /* clone object so we dont directly edit model */
    }

    $scope.cancel = function() {
      $('#modal').fadeOut(150);
      console.log("Canceled editing.");
    }

    $scope.delete = function(person) {
      console.log("Delete person: "+person.last_name+" "+person.first_name);
    }

    $scope.submitForm = function(valid) {
      console.log("Form valid:" + valid);
      if (valid) {
        $('#modal').fadeOut(150);
        console.log("Person saved!");
      }
    }

    /* Forms Finnish Personal Identity Code from date of birth and postfix */
    var formSocialID = function (day, month, year, postfix) {
      var centuryMark = year >= 2000 ? 'A' : '-';
      return socialid = leadZero(day, 2)+leadZero(month, 2)+leadZero(year, 2).substr(2)+centuryMark+postfix;
    }

    /* Adds leading zeros to numbers */
    var leadZero = function (num, length) {
      var r = "" + num;
      while (r.length < length) {
          r = "0" + r;
      }
      return r;
    }

});