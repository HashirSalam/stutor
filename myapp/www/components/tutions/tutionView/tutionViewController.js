var app = angular.module('stutor.tutionView', ["ui.router", 'ngFileUpload', "ui.bootstrap"]);

app.config([                        //Routing
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tutionView', {
                url: '/tutionView', //url: '/bookView/:id'
                templateUrl: "components/tutions/tutionView/tutionViewView.html",
                controller: "tutionViewController",
                controllerAs: "tutionViewCtrl",
            });
    }
]);

app.controller('tutionViewController', ['$scope', '$http', '$location', 'Upload', "$stateParams", "auth", //Controller
    function($scope, $http, $location, $upload, $stateParams, auth) {
        $scope.ad = {};
        $scope.error = "";

        $scope.tutionView = function() {
            //console.log(auth.getUserID());
            $http.get('api/adTutionView/' + auth.getUserID(), $scope.ad)
                .success(
                    function(data) {
                        //console.log(data.postedBy.name) ;
                        //console.log(data.imageUrl) ;
                        //console.log(data.postedOn);
                        console.log(data);
                        $scope.ad = data;
                        $scope.pagination(data.length);
                    }
                )
                .error(
                    function(response) {
                        alert("ERROR  AD ID :" + response["message"]);
                    }
                );
        };

        $scope.pagination = function(length) {

            $scope.viewby = 3;
            $scope.totalItems = length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5; //Number of pager buttons to show

            $scope.setPage = function(pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function() {
                console.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first paghe
            }

        };


        $scope.tutionView();


    }
]);


