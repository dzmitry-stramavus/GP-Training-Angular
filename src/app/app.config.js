(function(){
'use strict';

angular
  .module('gpApp')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('sum', {
      url: '/sum/:firstNumber/plus/:secondNumber',
      views: {
        'topNav': {
          templateUrl: 'src/app/topNav/topNav.html',
          controller: 'topNavCtrl'
        },
        'content': {
          template: '<sd-sum></sd-sum>' // directive: sum
        }
      }
    })
    .state('underscore', {
      url: '/underscore',
      views: {
        'topNav': {
          templateUrl: 'src/app/topNav/topNav.html',
          controller: 'topNavCtrl'
        },
        'content': {
          templateUrl: 'src/app/underscore/underscore.html',
          controller: 'underscoreCtrl'
        }
      }
    })
    .state('compose', {
      url: '/compose',
      views: {
        'topNav': {
          templateUrl: 'src/app/topNav/topNav.html',
          controller: 'topNavCtrl'
        },
        'content': {
          templateUrl: 'src/app/compose/compose.html',
          controller: 'composeCtrl'
        }
      }
    })
  $urlRouterProvider
    .otherwise('/sum//plus/');
}

})();