var app = angular.module('stutor.home', ["ui.router"]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('stutor.home', {
            url: '/page1',
            views: {
                'side-menu21': {
                    templateUrl:'components/home/homeView.html',
                    controller: 'homeController'
                }
            }
        })
    }
]);


app.controller('homeController', ['$scope', 'auth', '$location',
    function ($scope, auth, $location) {
        console.log("home c called");
        $scope.isLoggedIn = auth.isLoggedIn();
    }
]);