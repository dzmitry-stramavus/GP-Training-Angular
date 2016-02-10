(function() {
'use strict';

angular
  .module('gpApp')
  .controller('topNavCtrl', topNav);

function topNav($scope, $route) {
  $scope.isTrue = true;
  $scope.isRoute = function(path) {
    /*//issue: isRoute() is running every time several times, but controller is OK
    console.log(path);
    console.log($route.current.originalPath);
    console.log($route.current.originalPath.substr(1, path.length) === path);*/
    return $route.current.originalPath.substr(1, path.length) === path;
  }
}
})();