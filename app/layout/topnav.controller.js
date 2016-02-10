(function() {
'use strict';

angular
  .module('gpApp')
  .controller('topNavCtrl', topNav);

function topNav($scope, $route) {
  $scope.isTrue = true;
  $scope.isRoute = function(path) {
    return $route.current.originalPath.substr(1, path.length) === path;
  }
}
})();