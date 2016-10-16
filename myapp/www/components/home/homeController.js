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


app.controller('homeController', ['$scope', 'auth', '$location','$rootScope','$http',
    function ($scope, auth, $location,$rootScope , $http) {
        $scope.isLoggedIn = auth.isLoggedIn();

                $scope.leaders = [];

        $http.get('http://192.168.137.1:3000/api/getTopTeachers').success(function(data){
          $scope.leaders = data;

        }).error(function(msg){
           // alert("Error!\nSee log");
            console.log(msg);
        });
		
        $scope.ad = [];

        $rootScope.$on('searchOutput', function(event, args) {

            console.log("Event received");
            $scope.ad = args;
            $scope.pagination($scope.ad.length);
        });

        $scope.pagination = function(length) {

            $scope.viewby = 6;
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
                $scope.currentPage = 1; //reset to first page
            }

        };
    }
]);


