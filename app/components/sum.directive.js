(function(){
'use strict';

angular
  .module('gpApp')
  .directive('sdSum', sum);


function sum(){
  return {
    link: function(scope, element, attributes) {
     scope.$watch('firstNumber + secondNumber', function(newValue){
        scope.result = parseInt(scope.firstNumber) + parseInt(scope.secondNumber);
      });
    },
    restrict: 'E',
    templateUrl: 'app/components/sum.directive.html'
  }
}

})();