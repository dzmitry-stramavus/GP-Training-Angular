(function(){
'use strict';

angular
  .module('gpApp')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('sum', {
      url: '/sum/:firstNumber/plus/:secondNumber',
      template: '<sd-sum></sd-sum>',
      controller: 'sumCtrl',
      params: {
        firstNumber: '0',
        secondNumber: '0'
      }
    })
    .state('underscore', {
      url: '/underscore',
      templateUrl: 'app/underscore/underscore.html',
      controller: 'underscoreCtrl'
    })
    .state('compose', {
      url: '/compose',
      templateUrl: 'app/compose/compose.html',
      controller: 'composeCtrl'
    });
  $urlRouterProvider
    .otherwise('/sum/0/plus/0');
}

})();