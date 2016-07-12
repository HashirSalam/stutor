var app = angular.module('stutor.editprofile', ["ui.router"]);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('editprofile', {
                url: '/editprofile',
                templateUrl: "components/editprofile/editprofileView.html",
                controller: "EditProfileController",
                controllerAs: "EditProfileCtrl"
            });
    }]);

app.controller('EditProfileController',['$scope','auth', '$location', '$http',
    function ($scope, auth, $location, $http) {
        if(!auth.isLoggedIn()){
            $location.path('/logout');
        }

        var controller = this;
        controller.auth = auth;
        controller.editOptions = {};
        var userBackUp = {};
        controller.user = {};

        controller.resetUserLocal = function () {
            controller.user = angular.copy(controller.userBackUp);
        }
        controller.resetEditOptions = function () {
            controller.editOptions.editname = false;
            controller.editOptions.editsummary = false;
        }
        controller.editOptions.setEditName = function (status) {
            if(status){
                controller.editOptions.editname = true;
            }
            else{
                controller.editOptions.editname = false;
                controller.resetUserLocal();
            }
        }
        controller.editOptions.setEditSummary = function (status) {
            if(status){
                controller.editOptions.editsummary = true;
            }
            else{
                controller.editOptions.editsummary = false;
                controller.resetUserLocal();
            }
        }
        controller.editOptions.addEducation = function () {
            var education = {};

            if(!controller.user.education)
                controller.user.education = [];
            controller.user.education.push(education);
        }
        controller.editOptions.saveEducation = function () {
            controller.updateUserProfile();
            angular.element('#educationModal').modal('hide');
        }
        controller.editOptions.addCertification = function () {
            var certification = {};

            if(!controller.user.certifications)
                controller.user.certifications = [];
            controller.user.certifications.push(certification);
        }
        controller.editOptions.saveCertifications = function () {
            controller.updateUserProfile();
            angular.element('#myModal4').modal('hide');
        }

        controller.updateUserProfile = function(){
            $http.post('/editProfile/updateUserProfile', {user: controller.user, userId: controller.auth.getUserID()}).success(function (data) {
                controller.userBackUp = angular.copy(data);
                controller.user = angular.copy(data);
                controller.resetUserLocal();
                controller.resetEditOptions();
            });
        }

        var init = function () {
            controller.resetEditOptions();
            $http.get('/getUser/'+auth.getUserID()).success(function (data) {
                controller.userBackUp = angular.copy(data);
                controller.user = angular.copy(data);
            });
        }
        init();
    }
]);