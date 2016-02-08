;(function(){

/***************************************Modules****************************************/

  var underscore = angular.module('underscore', []);
  underscore.factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
  }]);


/************************************My App********************************************/

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

       scope.$watch("firstNumber + secondNumber", function(newValue){
          scope.result = parseInt(scope.firstNumber) + parseInt(scope.secondNumber);
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

  app.controller("getSumCtrl", function($scope, $routeParams, $location, $http) {
    $scope.firstNumber = $routeParams.firstNumber || 0;
    $scope.secondNumber = $routeParams.secondNumber || 0;

    if(!$scope.$parent.data) {
      $http.get('http://api.fixer.io/latest').then(fulfilled);
    };
    function fulfilled(response) {
      $scope.$parent.data = response.data;
      console.log("JSON loaded!");
      $scope.converted = $scope.$parent.data.rates['CAD'] * $scope.result;
      $scope.$parent.selectCurrency = $scope.$parent.data.rates;
      $scope.$parent.currency = $scope.$parent.selectCurrency["CAD"];
    }
    $scope.$watch("result + $parent.currency", function(newValue, oldValue){
      $scope.converted = ($scope.$parent.data ? $scope.$parent.currency : 1) * $scope.result;
    });

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
      $scope.arrayResult = $scope.array = [];
    };

    $scope.multiply = function() {
      $scope.arrayResult = _.map($scope.array, function(elem) {
        return elem * $scope.multiplyBy;
      });
    };

    $scope.select = function() {
      var expression = "";
      if ($scope.selectOption.value === "even") {
        expression = '(elem % 2) === 0';
      } else if ($scope.selectOption.value === "odd") {
        expression = '(elem % 2) !== 0;';
      } else if ($scope.selectOption.value === "greaterThanTen") {
        expression = 'elem > 10;';
      } else if ($scope.selectOption.value === "lessThanTen") {
        expression = 'elem < 10;';
      }
      $scope.arrayResult = _.select($scope.array, function(elem){
        return eval(expression);
      });
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

    $scope.rate = 1.5;

    $scope.$watch("rate + firstNumber + secondNumber", function(newValue){
      $scope.result = _.compose(rateconversion, add)($scope.firstNumber, $scope.secondNumber);
    });

  });
})();