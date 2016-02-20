(function() {
'use strict';

angular
  .module('gpApp')
  .controller('sumCtrl', sum);

function sum($scope, $state, $http) {
  $scope.firstNumber = $state.params.firstNumber;
  $scope.secondNumber = $state.params.secondNumber;

  if(!$scope.$parent.data) {
    $http.get('http://api.fixer.io/latest').then(fulfilled);
  };

  $scope.$watch('result + $parent.currency', function() {
    $scope.converted = ($scope.$parent.data ? $scope.$parent.currency : 1) * $scope.result;
  });

// issue: if we change path by $location.path or $state.go, sum controller is running
// every time when inputs(firstNumber and secondNumber) are changed
  $scope.$watch('firstNumber', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.$parent.focus = '1';
      $state.go( 'sum', {firstNumber: $scope.firstNumber, secondNumber: $scope.secondNumber});
    }
  });
  $scope.$watch('secondNumber', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.$parent.focus = '2';
      $state.go( 'sum', {firstNumber: $scope.firstNumber, secondNumber: $scope.secondNumber});
    }
  });
  $scope.$watch('focus', function(newValue, oldValue) {
    if (newValue === '1') {
      // use 'document' instead of $document because $document doesn't have focus() method;
      document.querySelector('#firstNumber').focus();
    } else if (newValue === '2') {
      document.querySelector('#secondNumber').focus();
    }
  });

  function fulfilled(response) {
    $scope.$parent.data = response.data;
    console.log('JSON loaded!');
    $scope.converted = $scope.$parent.data.rates['CAD'] * $scope.result;
    $scope.$parent.selectCurrency = $scope.$parent.data.rates;
    $scope.$parent.currency = $scope.$parent.selectCurrency['CAD'];
  }
}

})();