(function(){
'use strict';

angular
  .module('gpApp')
  .config(config);

config.$ingect = ['$routeProvider'];

function config($routeProvider) {
  $routeProvider.
    when('/sum', {
        template: '<sd-sum></sd-sum>',
        controller: 'sumCtrl'
      }).
    when('/sum/:firstNumber/plus/:secondNumber', {
      template: '<sd-sum></sd-sum>',
      controller: 'sumCtrl'
    }).
    when('/underscore', {
      templateUrl: 'app/underscore/underscore.html',
      controller: 'underscoreCtrl'
    }).
    when('/compose', {
      templateUrl: 'app/compose/compose.html',
      controller: 'composeCtrl'
    }).
    otherwise({
      redirectTo: '/sum'
    });
}

})();