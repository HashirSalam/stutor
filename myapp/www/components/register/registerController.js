var app = angular.module('stutor.register', ["ui.router"]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('stutor.register', {
                url: '/page3',
                views: {
                    'side-menu21': {
                        templateUrl: 'components/register/registerView.html',
                        controller: 'registerController'
                    }
                }
            })
    }]);

app.controller('registerController', ['$scope', 'auth', '$location',
    function ($scope, auth, $location) {

        $scope.user = {};
        $scope.error = "";

        $scope.register = function () {
            if (!$scope.user.name || !$scope.user.email ||
                !$scope.user.password || !$scope.user.confirmPassword ||
                !$scope.user.dob || !$scope.user.role

            ) {
                $scope.error = "Fill out all Required Fields!";
            }
            else if (!$scope.user.agreedOnTerms) {
                $scope.error = "You must agree to Stutor Terms & Conditions!";
            }
            else if ($scope.user.password != $scope.user.confirmPassword) {
                $scope.password = "";
                $scope.confirmPassword = "";
                $scope.error = "Passwords do not match!"
            }
            else {
                auth.register($scope.user).error(function (error) {
                    $scope.error = error["message"];
                }).then(function () {
                    $scope.success = "!";
                    //$location.path("/edit-profile");
                });
            }
        };
    }
]);