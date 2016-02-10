(function(){
'use strict';

angular
  .module('gpApp')
  .directive('sdSelectOnClick', selectOnClick);

function selectOnClick() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
        element.on('focus', function () {
            this.select();
        });
    }
  };
}

})();