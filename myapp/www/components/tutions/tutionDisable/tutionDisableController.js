var app = angular.module('stutor.tutionDisable', ["ui.router"]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tutionDisable', {
                url: '/tutionDisable/:id',
                templateUrl: "components/tutions/tutionDisable/tutionDisableView.html",
                controller: "tutionDisableController",
                controllerAs: "tutionDisableCtrl"
            });
    }]);

app.controller('tutionDisableController', ['$scope', '$http', 'auth', '$location', "$stateParams",
    function ($scope, $http, auth, $location, $stateParams) {
        if (!auth.isLoggedIn()) {        //Check if Logged In
            $location.path('/logout');
        }

        $scope.ad = {};
        $scope.disable = {};
        $scope.error = "";

        $scope.tutionDisable = function (id) {
            $http.get('api/adTutionDetail/' + $stateParams.id)
                .success(
                    function (data) {
                        $scope.ad = data;
                        $scope.disable.title = $scope.ad.title;
                        $scope.disable.adID = $scope.ad._id;
                    }
                )
                .error(
                    function (response) {
                        $scope.error = response["message"];
                    }
                );
        };

        $scope.tutionDelete = function () {
            if(!$scope.disable.reason){
                $scope.error = "Please Specify the Reason!";
            }
            else{
                $http.post('/api/adTutionDelete/', {
                    disable: $scope.disable,
                    userId: auth.getUserID()
                }).success(function (data) {
                    $location.url('/tutionView');
                }).error(function (response) {
                    $scope.error = response.message;
                    console.log("FAILURE");
                    console.log(response);
                });
            }
        };
        $scope.tutionDisable($stateParams.id);
    }
]);