(function() {
'use strict';

angular
  .module('gpApp')
  .controller('sumCtrl', sum);


function sum($scope, $routeParams, $location, $http) {
  $scope.firstNumber = $routeParams.firstNumber || 0;
  $scope.secondNumber = $routeParams.secondNumber || 0;

  if(!$scope.$parent.data) {
    $http.get('http://api.fixer.io/latest').then(fulfilled);
  };

  $scope.$watch('result + $parent.currency', function() {
    $scope.converted = ($scope.$parent.data ? $scope.$parent.currency : 1) * $scope.result;
  });

  $scope.$watch('firstNumber', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.$parent.focus = '1';
      $location.path( '/sum/' + $scope.firstNumber + '/plus/' + $scope.secondNumber);
    }
  });
  $scope.$watch('secondNumber', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.$parent.focus = '2';
      $location.path( '/sum/' + $scope.firstNumber + '/plus/' + $scope.secondNumber);
    }
  });
  $scope.$watch('focus', function(newValue, oldValue) {
    if (newValue === '1') {
      document.querySelector('#firstNumber').focus();
    } else if (newValue === "2") {
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