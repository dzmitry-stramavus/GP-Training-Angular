(function() {
'use strict';

angular
  .module('gpApp')
  .controller('topNavCtrl', topNav);

function topNav($scope, $state) {
  $scope.isRoute = function(path) {

    /* //issue: isRoute() is running every time several times, but controller is OK when inputs changed

    console.log(path);
    console.log($state.current.url);*/

    return $state.current.url.substr(1, path.length) === path;
  }
}
})();