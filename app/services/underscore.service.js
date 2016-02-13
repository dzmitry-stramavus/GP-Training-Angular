(function() {
'use strict';

angular
  .module('gpApp')
  .factory('_', underscore);

function underscore($window) {
  return $window._;
}

})();