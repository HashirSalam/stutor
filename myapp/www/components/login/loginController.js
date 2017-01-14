var app = angular.module('stutor.login', ["ui.router"]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('stutor.login', {
                url: '/page2',
                views: {
                    'side-menu21': {
                        templateUrl: 'components/login/loginView.html',
                        controller: 'LoginController'
                    }
                }
            })
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
                $scope.success = "!";
                $location.path("/successlogin");
                            });
        };
    }
]);