var app = angular.module('stutor.tutionView', ["ui.router","ui.bootstrap"]);



app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('stutor.tutionView', {
            url: '/tutionView',
            views: {
                'side-menu21': {
                    templateUrl:"components/tutions/tutionView/tutionViewView.html",
                    controller: 'tutionViewController'
                }
            }
        })
    }
]);


app.controller('tutionViewController', ['$scope', '$http', "$stateParams", "auth", //Controller
    function($scope, $http, $stateParams, auth) {
        $scope.ad = {};
        $scope.error = "";

        $scope.tutionView = function() {
            //console.log(auth.getUserID());
            $http.get('http://www.stutor.pk/api/adTutionView/' + auth.getUserID(), $scope.ad)
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


