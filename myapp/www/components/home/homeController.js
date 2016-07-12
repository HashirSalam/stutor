var app = angular.module('stutor.home', ["ui.router"]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
                url: '/home',
                templateUrl: 'components/home/homeView.html',
                controller: 'homeController'
        });
    }
]);

app.controller('homeController', ['$scope', 'auth', '$location',
    function ($scope, auth, $location) {
        $scope.isLoggedIn = auth.isLoggedIn();
    }
]);