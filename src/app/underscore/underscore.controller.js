(function() {
'use strict';

angular
  .module('gpApp')
  .controller('underscoreCtrl', underscore);


function underscore($scope, _) {
  $scope.array = [];
  $scope.multiplyBy = 1;
  $scope.filterOptions = [
    {
      display: 'Select from list',
      value: 'null'
    },
    {
      display: 'Even',
      value: 'even'
    },
    {
      display: 'Odd',
      value: 'odd'
    },
    {
      display: 'Greater than 10',
      value: 'greaterThanTen'
    },
    {
      display: 'Less than 10',
      value: 'lessThanTen'
    }
  ];
  $scope.selectOption = $scope.filterOptions[0];

  $scope.getRandomArray = function() {
    var i = 0;
    var array = [];
    while(i < 10) {
      var item = Math.floor(Math.random()*20);
      if (array.indexOf(item) === -1) {
        array.push(item);
        i++;
      }
    }
    $scope.arrayResult = $scope.array = array;
  };

  $scope.cleanArray = function() {
    $scope.arrayResult = $scope.array = [];
  };

  $scope.multiply = function() {
    $scope.arrayResult = _.map($scope.array, function(elem) {
      return elem * $scope.multiplyBy;
    });
  };

  $scope.select = function() {
    var expression = '';
    if ($scope.selectOption.value === 'even') {
      expression = '(elem % 2) === 0';
    } else if ($scope.selectOption.value === 'odd') {
      expression = '(elem % 2) !== 0;';
    } else if ($scope.selectOption.value === 'greaterThanTen') {
      expression = 'elem > 10;';
    } else if ($scope.selectOption.value === 'lessThanTen') {
      expression = 'elem < 10;';
    }
    $scope.arrayResult = _.select($scope.array, function(elem){
      return eval(expression);
    });
  };

  $scope.$watch('multiplyBy', function(newValue) {
    $scope.multiply();
  });
  $scope.$watch('selectOption', function(newValue) {
    $scope.select();
  });
}

})();