var app = angular.module('stutor.tutionPost', ["ui.router", 'ngFileUpload','ngTagsInput' ]);

app.config([              //Routing
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('stutor.tutionPost', {
                url: '/page4',
                views: {
                    'side-menu21': {
                        templateUrl: "components/tutions/tutionPost/tutionPostView.html",
                        controller: 'tutionPostController'
                    }
                }
            });
    }]);

app.controller('tutionPostController', ['$scope', '$http', '$location', 'Upload', 'auth',      //Controller
    function ($scope, $http, $location, $upload, auth) {
        //if (!auth.isLoggedIn()) {
        //    $location.path('/logout');           //Uncomment it later before deployment
        //}
        $scope.ad = {};
        $scope.error = "";
        

        $scope.tutionPost = function () {
            
            if (!$scope.ad.title || !$scope.ad.description || !$scope.ad.lookingFor || !$scope.ad.courses || !$scope.ad.agreedOnTerms) {
                $scope.error = "Fill out all Required Fields & agree to Stutor terms!";
            }
            else {
                $upload.upload({
                    url: 'http://127.0.0.1:3000/api/adPost',
                    method: 'POST',
                    data: {file: $scope.adImg, ad: $scope.ad, userId: auth.getUserID()}  //file: contains image , ad : contains ad information , userID :contains user info

                }).then(function (resp) {
                    alert("AD posted Successfully !")
                    $location.url("/tutionDetail/" + resp.data._id);  //redirects to detail page along with ad ID
                }, function (response) {
                    $scope.error = response.data.message;
                }, function (evt) {
                    // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        };
    }
]);