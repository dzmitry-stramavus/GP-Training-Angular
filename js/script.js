;(function(){
  var underscore = angular.module('underscore', []);
  underscore.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);

  var app = angular.module("calculusApp", ['underscore']);

  app.controller("getSumCtrl", function($scope){

  });

  app.controller("underscoreCtrl", function($scope, _){
    $scope.array = [1, 2, 3, 4, 5];
    $scope.arrayResult = $scope.array;

    $scope.multiply = function(array, multiplyBy) {
      $scope.arrayResult = _.map(array, function(elem){
        return elem * multiplyBy;
      });
      $scope.multiplyBy = "";
    };
  });
})();