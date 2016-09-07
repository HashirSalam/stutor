angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('stutor.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('stutor', {
    url: '/side-menu21',
    templateUrl: 'templates/stutor.html',
    abstract:true
  })

  .state('stutor.login', {
    url: '/page2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('stutor.register', {
    url: '/page3',
    views: {
      'side-menu21': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

  

});