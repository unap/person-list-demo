angular.module('myApp.controllers', [])

.controller('MainCtrl', function ($scope, $http) {
  $scope.personlist = [];
  $scope.checkedlist = [];

  $scope.sortOption = 'last_name';
  $scope.navbarCollapsed = true;

  $http.get('data/mockdata.json')
    .success(function (data) {
      data.forEach( function (person) {
        /* Century mark is not saved in data, calculate it now */
        $scope.updatePIC(person, person.year);
        $scope.personlist.push(person);
      });
    });

  /* Edit person or create new person */
  $scope.editPerson = function(person) {
    /* if person is falsey, create new person with smallest free id*/
    if (!person) { person = {id: $scope.findFreeID()}; }
    $scope.editedperson = angular.copy(person); /* clone object so we don't directly edit model */
    $scope.updatePIC($scope.editedperson, $scope.editedperson.year);
    $('#modal').fadeIn(150);
  }

  /* Delete person from list */
  $scope.delete = function(person) {
    var idx = $scope.findIndexByID(person.id);
    if (idx > -1) {
      $scope.personlist.splice(idx, 1);
    }
    /* Also remove from checkedlist */
    idx = $scope.findIndexByID(person.id, $scope.checkedlist);
    if (idx > -1) {
      $scope.checkedlist.splice(idx, 1);
    }
  }

  /* Add or remove person from list of 'checked' people */
  $scope.check = function(person) {
    if (person.checked) {
      $scope.checkedlist.push(person);
    } else {
      var idx = $scope.findIndexByID(person.id, $scope.checkedlist);
      if (idx > -1) {
        $scope.checkedlist.splice(idx, 1);
      }
    }
  }

  /* Delete checked people from list */
  $scope.deleteChecked = function() {
    $scope.checkedlist.forEach(function(person) {
      var idx = $scope.findIndexByID(person.id);
      if (idx > -1) {
        $scope.personlist.splice(idx, 1);
      }
    });
    $scope.checkedlist = [];
  }

  /* Cancel editing person, close modal */
  $scope.cancel = function() {
    $('#modal').fadeOut(150);
    $scope.resetForm();
  }

  /* Save edited person */
  $scope.submitForm = function(valid, editedperson) {
    if (valid) {
      $('#modal').fadeOut(150);
      console.log("save: "+JSON.stringify( $scope.editedperson));
      var idx = $scope.findIndexByID(editedperson.id);
      if (idx > -1) {
        $scope.personlist[idx] = angular.copy(editedperson);
      } else {
        $scope.personlist.push(angular.copy(editedperson));
      }
    }
    $scope.resetForm();
  }

  /* Empty the form model and reset validity */
  $scope.resetForm = function() {
    $scope.editForm.$setPristine();
    for (var key in $scope.editedperson) $scope.editedperson[key] = "";
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
  $scope.updatePIC = function (person, year) {
    person.picchar = year >= 2000 ? 'A' : '-';
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