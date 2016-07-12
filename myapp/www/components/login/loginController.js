var app = angular.module('stutor.login', ["ui.router"]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: "components/login/loginView.html",
                controller: "LoginController",
                controllerAs: "LoginCtrl"
            });
    }]);

app.controller('LoginController', ['$scope', 'auth', '$location',
    function ($scope, auth, $location) {
        $scope.user = {};
        $scope.error = "";

        $scope.logIn = function () {
            auth.logIn($scope.user).error(function (error) {
                $scope.error = error["message"];
            }).then(function () {
                //$state.go('home');
                $location.path("/successlogin");
            });
        };
    }
]);