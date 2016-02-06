;(function(){
  var underscore = angular.module('underscore', []);
  underscore.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);

  var app = angular.module("calculusApp", ['underscore']);

  app.controller("getSumCtrl", function($scope) {

  });

  app.controller("underscoreCtrl", function($scope, _) {
    $scope.array = [];
    $scope.arrayResult = $scope.array;
    $scope.testArray = [0,1,2,3,4,5,18,15,14,11,16];
    $scope.underscoreMenu = false;
    $scope.filterOptions = [
      {
        display: "Select from list",
        value: "null"
      },
      {
        display: "Even",
        value: "even"
      },
      {
        display: "Odd",
        value: "odd"
      },
      {
        display: "Greater than 10",
        value: "greaterThanTen"
      },
      {
        display: "Less than 10",
        value: "lessThanTen"
      }
    ];
    $scope.selectOption = $scope.filterOptions[0];

    $scope.useTestArray = function() {
      $scope.array = $scope.testArray;
    };

    $scope.cleanArray = function() {
      $scope.array = [];
    };

    $scope.pushToArray = function() {
      $scope.array.push(parseInt($scope.elemToAdd));
      $scope.elemToAdd = "";
    };

    $scope.multiply = function(array, multiplyBy) {
      $scope.arrayResult = _.map(array, function(elem) {
        return elem * multiplyBy;
      });
      $scope.multiplyBy = "";
    };

    $scope.select = function(array) {
      switch ($scope.selectOption.value) {
        case "even":
           $scope.arrayResult = _.select(array, function(elem){  return (elem % 2) === 0;  });
           break;
        case "odd":
          $scope.arrayResult = _.select(array, function(elem){  return (elem % 2) !== 0;  });
           break;
        case "greaterThanTen":
          $scope.arrayResult = _.select(array, function(elem){  return elem > 10;  });
           break;
        case "lessThanTen":
          $scope.arrayResult = _.select(array, function(elem){ return elem < 10;  });
           break;
      };
    };
  });

})();