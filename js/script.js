;(function(){
  var underscore = angular.module('underscore', []);
  underscore.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);

  var app = angular.module("calculusApp", ['underscore']);

  app.controller("getSumCtrl", function($scope){

  });

  app.controller("underscoreCtrl", function($scope, _){
    $scope.array = [];
    $scope.arrayResult = $scope.array;

    $scope.pushToArray = function(){
      $scope.array.push(parseInt($scope.elemToAdd));
      $scope.elemToAdd = "";
    };

    $scope.multiply = function(array, multiplyBy) {
      $scope.arrayResult = _.map(array, function(elem){
        return elem * multiplyBy;
      });
      $scope.multiplyBy = "";
    };
  });
})();