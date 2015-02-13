angular.module('myApp.controllers', [])

.controller('MainCtrl', function ($scope, $http) {
  $scope.personlist = [];
  $scope.checkedlist = [];

  $scope.sortOption = 'last_name';
  $scope.navbarCollapsed = true;

  $http.get('data/mockdata.json')
    .success(function (data) {
      $scope.personlist = data;
    });

  /* Edit person or create new person */
  $scope.editPerson = function(person) {
    /* if person is falsey, create new person with smallest free id*/
    if (!person) { person = {id: $scope.findFreeID()}; }
    $scope.editedperson = jQuery.extend({}, person); /* clone object so we don't directly edit model */
    $scope.updatePIC($scope.editedperson.year);
    $('#modal').fadeIn(150);
  }

  /* Cancel editing person, close modal */
  $scope.cancel = function() {
    $('#modal').fadeOut(150);
  }

  /* Delete person from list */
  $scope.delete = function(person) {
    var idx = $scope.findIndexByID(person.id);
    $scope.personlist.splice(idx, 1);
  }

  /* Add or remove person from list of 'checked' people */
  $scope.check = function(person) {
    if (person.checked) {
      $scope.checkedlist.push(person);
    } else {
      $scope.checkedlist.splice($scope.findIndexByID(person.id, $scope.checkedlist), 1);
    }
  }

  /* Delete checked people from list */
  $scope.deleteChecked = function() {
    $scope.checkedlist.forEach(function(person) {
      $scope.personlist.splice($scope.findIndexByID(person.id), 1);
    });
    $scope.checkedlist = [];
  }

  /* Save edited person */
  $scope.submitForm = function(valid, editedperson) {
    if (valid) {
      $('#modal').fadeOut(150);
      var idx = $scope.findIndexByID(editedperson.id);
      if (idx > -1) {
        $scope.personlist[idx] = editedperson;
      } else {
        $scope.personlist.push(editedperson);
      }
    }
  }

  /* Find persons array index by person.id, optional list */
  $scope.findIndexByID = function (id, list) {
    list = list || $scope.personlist;
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].id == id) {
        return i;
      }
    };
    return -1;
  }

  /* Update Personal Identity Code century character based on year of birth */
  $scope.updatePIC = function (year) {
    $scope.editedperson["picchar"] = year >= 2000 ? 'A' : '-';
  }

  /* Find first free id */
  $scope.findFreeID = function () {
    var list = $scope.personlist;
    for (var i = 0, idx = 1; i < list.length; i++) {
      if (list[i].id == idx) idx++;
      if (list[i].id > idx) break;
    }
    return idx;
  }

});