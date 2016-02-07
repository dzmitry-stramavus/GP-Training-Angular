;(function(){

  var underscore = angular.module('underscore', []);
  underscore.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);

  var app = angular.module("calculusApp", ['ngRoute','underscore']);

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/getSum', {
            template: '<sd-get-sum></sd-get-sum>',
            controller: 'getSumCtrl'
          }).
        when('/getSum/:firstNumber/plus/:secondNumber', {
          template: '<sd-get-sum></sd-get-sum>',
          controller: 'getSumCtrl'
        }).
        when('/useUnderscore', {
          templateUrl: 'templates/useUnderscore.html',
          controller: 'underscoreCtrl'
        }).
        when('/compose', {
          templateUrl: 'templates/compose.html',
          controller: 'composeCtrl'
        }).
        otherwise({
          redirectTo: '/getSum'
        });
    }
  ]);

/**************************************Directives**************************************/

  app.directive("sdGetSum", function(){
    return {
      link: function(scope,element, attributes) {

        scope.$watch("firstNumber", function(newValue){
          scope.result = parseInt(newValue) + parseInt(scope.secondNumber);
        });
        scope.$watch("secondNumber", function(newValue){
          scope.result = parseInt(newValue) + parseInt(scope.firstNumber);
        });

      },
      restrict: "E",
      template: function () {
        return angular.element(document.querySelector("#getSumTemplate")).html();
      }
    }
  });

  app.directive('sdSelectOnClick', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('focus', function () {
                this.select();
            });
        }
    };
});

/*************************************Controllers*************************************/

  app.controller("getSumCtrl", function($scope, $routeParams, $location) {
    $scope.firstNumber = $routeParams.firstNumber || 0;
    $scope.secondNumber = $routeParams.secondNumber || 0;

    $scope.$watch("firstNumber", function(newValue, oldValue){
      if (newValue !== oldValue) {
        $scope.$parent.focus = "1";
        $location.path( "/getSum/" + $scope.firstNumber + "/plus/" + $scope.secondNumber);
      }
    });
    $scope.$watch("secondNumber", function(newValue, oldValue){
      if (newValue !== oldValue) {
        $scope.$parent.focus = "2";
        $location.path( "/getSum/" + $scope.firstNumber + "/plus/" + $scope.secondNumber);
      }
    });
    $scope.$watch("focus", function(newValue, oldValue){
      if (newValue === "1") {
        document.querySelector('#firstNumber').focus();
      } else if (newValue === "2") {
        document.querySelector('#secondNumber').focus();
      }
    });
  });

  app.controller("underscoreCtrl", function($scope, _) {
    $scope.array = [];
    $scope.multiplyBy = 1;
    $scope.filterOptions = [
      {
        display: "Select from list",
        value: "null"
      },
      {
        display: "Even",
        value: "even"
      },
      {
        display: "Odd",
        value: "odd"
      },
      {
        display: "Greater than 10",
        value: "greaterThanTen"
      },
      {
        display: "Less than 10",
        value: "lessThanTen"
      }
    ];
    $scope.selectOption = $scope.filterOptions[0];

    $scope.getRandomArray = function() {
      var i = 0;
      var array = [];
      while(i < 10) {
        var item = Math.floor(Math.random()*20);
        if (array.indexOf(item) === -1) {
          array.push(item);
          i++;
        }
      }
      $scope.arrayResult = $scope.array = array;
    };

    $scope.cleanArray = function() {
      $scope.array = [];
      $scope.arrayResult = [];
    };

    $scope.multiply = function() {
      $scope.arrayResult = _.map($scope.array, function(elem) {
        return elem * $scope.multiplyBy;
      });
    };

    $scope.select = function() {
      switch ($scope.selectOption.value) {
        case "even":
           $scope.arrayResult = _.select($scope.array, function(elem){  return (elem % 2) === 0;  });
           break;
        case "odd":
          $scope.arrayResult = _.select($scope.array, function(elem){  return (elem % 2) !== 0;  });
           break;
        case "greaterThanTen":
          $scope.arrayResult = _.select($scope.array, function(elem){  return elem > 10;  });
           break;
        case "lessThanTen":
          $scope.arrayResult = _.select($scope.array, function(elem){ return elem < 10;  });
           break;
      };
    };
    $scope.$watch("multiplyBy", function(newValue){
      $scope.multiply();
    });
    $scope.$watch("selectOption", function(newValue){
      $scope.select();
    });
  });

  app.controller("composeCtrl", function($scope, _) {
    var add = function(a,b){
        return parseInt(a) + parseInt(b);
    }
    var rateconversion = function(value){
        return value * $scope.rate;
    }

    $scope.firstNumber = 0;
    $scope.secondNumber = 0;
    $scope.rate = 1.5;
    $scope.composed = _.compose(rateconversion, add);

    $scope.$watch("rate", function(newValue){
      $scope.result = $scope.composed($scope.firstNumber, $scope.secondNumber);
    });
    $scope.$watch("firstNumber", function(newValue){
      $scope.result = $scope.composed(newValue, $scope.secondNumber);
    });
    $scope.$watch("secondNumber", function(newValue){
      $scope.result = $scope.composed($scope.firstNumber, newValue);
    });

  });
})();