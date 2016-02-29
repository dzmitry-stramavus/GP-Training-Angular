(function(){
'use strict';

angular
  .module('gpApp')
  .directive('sdSum', sum);


function sum(){
  return {
    restrict: 'E',
    templateUrl: 'src/app/components/sum.directive/sum.directive.html',
    controller: 'sumCtrl'
  }
}

})();