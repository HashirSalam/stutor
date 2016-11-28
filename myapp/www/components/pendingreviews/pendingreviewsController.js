var app = angular.module('stutor.pendingreviews', ["ui.router"]);


app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('stutor.pendingreviews', {
                url: '/page5',
                views: {
                    'side-menu21': {
                        templateUrl: 'components/pendingreviews/pendingreviewsView.html',
                        controller: 'pendingreviewsController'
                    }
                }
            })
    }]);

app.controller('pendingreviewsController', ['$scope', 'auth', '$location', '$http',
    function ($scope, auth, $location, $http) {
        if(!auth.isLoggedIn()){
            $location.url("/logout");
        }

        $http.get('http://127.0.0.1:3000/api/getUserPendingReviews/' + auth.getUserID()).success(function (data) {
            $scope.userPendingReviews = angular.copy(data);
        });

        $scope.reviewResult = function (review, status) {
            $http.post('http://127.0.0.1:3000/api/userReviewResult', {
                userId: auth.getUserID(),
                reviewId: review._id,
                status: status
            }).success(function (data) {
                $http.get('http://127.0.0.1:3000/api/getUserPendingReviews/' + auth.getUserID()).success(function (data) {
                    $scope.userPendingReviews = angular.copy(data);
                });
            });
        };
    }
]);