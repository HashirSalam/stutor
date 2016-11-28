var app = angular.module('stutor',
    [	
		"ionic",
        "ui.bootstrap",
        "stutor.login",
        "stutor.home",
        "stutor.register",
        "stutor.tutionPost",
        "stutor.tutionView",
        "stutor.tutionDetail",
        "stutor.pendingreviews",
        
    ]
);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
		
    $stateProvider

  .state('stutor', {
    url: '/side-menu21',
    templateUrl: 'templates/stutor.html',
    abstract:true
  })

$urlRouterProvider.otherwise('/side-menu21/page1')

    }]);



app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        if (cordova.plugins.Keyboard.hideKeyboardAccessoryBar) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });		
})
	
app.factory('auth', ['$http', '$window', function ($http, $window) {
    var auth = {};

    auth.saveToken = function (token) {
        $window.localStorage['stutor-system-token'] = token;
    };

    auth.getToken = function () {
        return $window.localStorage['stutor-system-token'];
    };

    auth.saveUserID = function (userid) {
        $window.localStorage['stutor-user-id'] = userid;
    };

    auth.getUserID = function () {
        return $window.localStorage['stutor-user-id'];
    };

    auth.isLoggedIn = function () {
        var token = auth.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentUser = function () {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.email;
        }
    };

    auth.register = function (user) {
        return $http.post('http://127.0.0.1:3000/api/register', user).success(function (data) {
            auth.saveToken(data.token);
            auth.saveUserID(data.userId);
        });
    };

    auth.logIn = function (user) {
        return $http.post('http://127.0.0.1:3000/api/login', user).success(function (data) {
            auth.saveToken(data.token);
            auth.saveUserID(data.userId);
        });
    };

    auth.logOut = function () {
        $window.localStorage.removeItem('stutor-system-token');
        $window.localStorage.removeItem('stutor-user-id');
    };

    return auth;
}]);



app.controller('SearchWidgetController', function ($scope,$rootScope,$location,$http) {
    var ctrl = this;
    ctrl.search = {text: "", type: "both", city: "all"};
    ctrl.searchNow = function (search) {
      $location.path('/home');
      console.log('execution contiues');
      $http.get('http://127.0.0.1:3000/api/tutionSearch?searchOptions=' +  JSON.stringify(ctrl.search))
          .success(
              function (data) {
                console.log(data);
                $rootScope.$emit('searchOutput', data);
              }
          )
          .error(
              function (response) {
                  alert("ERROR  TUTION SEARCH :" + response["message"]);
              }
          );
    }


});