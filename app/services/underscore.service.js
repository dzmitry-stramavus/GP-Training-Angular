(function() {
'use strict';

angular
  .module('gpApp')
  .factory('_', underscore);

underscore.$inject = ['$window'];

function underscore($window) {
  return $window._;
}

})();