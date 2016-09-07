var app = angular.module('stutor.tutionEdit', ["ui.router", 'ngFileUpload']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tutionEdit', {
                url: '/tutionEdit/:id',
                templateUrl: "components/tutions/tutionEdit/tutionEditView.html",
                controller: "tutionEditController",
                controllerAs: "tutionEditCtrl"
            });
    }]);

app.controller('tutionEditController', ['$scope', '$http', 'auth', '$location', 'Upload', "$stateParams",
    function ($scope, $http, auth, $location, $upload, $stateParams) {
        if (!auth.isLoggedIn()) {        //Check if Logged In
            $location.path('/logout');
        }

        $scope.ad = {};
        $scope.error = "";

        $scope.tutionEdit = function (id) {
            //Check if same user
            $http.get('api/adTutionEdit/' + $stateParams.id, $scope.ad)
                .success(
                    function (data) {
                        if (data.postedBy._id != auth.getUserID())   //Check if same user or not
                        {
                            $location.path('/logout');
                        }
                        $scope.ad = data;
                    }
                )
                .error(
                    function (response) {
                        console.log("ERROR  AD ID :" + response["message"]);
                    }
                );
        };

        $scope.tutionUpdate = function (id) {
            if (!$scope.ad.title || !$scope.ad.description || !$scope.ad.courses) {
                $scope.error = "Fill out all Required Fields!";
            }
            else {
                $upload.upload({
                    url: '/api/adTutionUpdate/' + $stateParams.id,
                    method: 'POST',
                    data: {file: $scope.adImg, ad: $scope.ad, userId: auth.getUserID()}  //file: contains image , tution : contains tution information , userID :contains user info
                }).then(function (resp) {
                    $location.url("/tutionDetail/" + resp.data._id);  //redirects to detail page along with tution ID

                }, function (response) {
                    $scope.error = response.data.message;
                    console.log("FAILURE");
                    console.log(response);

                }, function (evt) {
                    // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        };

        $scope.Disable = function (id) {
            $location.url('/tutionDisable/' + id);
        };
        $scope.tutionEdit();
    }
]);