(function() {
'use strict';

angular
  .module('gpApp')
  .controller('composeCtrl', compose);


function compose($scope, _) {
  $scope.rate = 1.5;

  $scope.$watch('rate + firstNumber + secondNumber', function(newValue) {
    $scope.result = _.compose(rateconversion, add)($scope.firstNumber, $scope.secondNumber);
  });

  function add(a,b) {
    return parseInt(a) + parseInt(b);
  }
  function rateconversion(value) {
    return value * $scope.rate;
  }
}

})();