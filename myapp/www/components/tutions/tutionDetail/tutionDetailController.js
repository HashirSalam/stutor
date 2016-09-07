var app = angular.module('stutor.tutionDetail', ["ui.router", 'ngRating']);

app.config([              //Routing
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tutionDetail', {
                url: '/tutionDetail/:id',
                templateUrl: "components/tutions/tutionDetail/tutionDetailView.html",
                controller: "tutionDetailController",
                controllerAs: "tutionDetailCtrl",
            });
    }]);

app.filter('showAvailabilityFilter', function () {
    function timeTo12HrFormat(hr) {
        var ampm = 'AM';
        if (hr >= 12) {
            ampm = 'PM';
        }
        if (hr > 12) {
            hr = hr - 12;
        }
        if (hr == 0) {
            hr = 12;
        }

        return hr + ':' + '00' + ' ' + ampm;
    }

    return function (x) {
        if (!x) {
            return;
        }
        return timeTo12HrFormat(x.stime) + " TO " + timeTo12HrFormat(x.etime);
    };
});

app.controller('tutionDetailController', ['$scope', '$http', '$location', 'Upload', "$stateParams",      //Controller
    function ($scope, $http, $location, $upload, $stateParams) {
        $scope.ad = {};
        $scope.error = "";

        $scope.tutionDetail = function (id) {
            console.log($stateParams.id);
            $http.get('api/adTutionDetail/' + $stateParams.id, $scope.ad)
                .success(
                    function (data) {
                        $scope.ad = data;
                        $scope.showOnMap();
                    }
                )
                .error(
                    function (response) {
                        console.log("ERROR  AD ID :" + response["message"]);
                    }
                );
        };

        $scope.viewProfile = function () {
            $location.path('/viewProfile/' + $scope.ad.postedBy._id);
        };

        $scope.showOnMap = function() {
            var elementId = "map-canvas";
            if(!$scope.ad.postedBy.geoLocation){
                return;
            }
            var latLng  = new google.maps.LatLng($scope.ad.postedBy.geoLocation.lat,$scope.ad.postedBy.geoLocation.lng);
            var myOptions = {
                zoom: 16,
                center: latLng
            };
            $scope.map = new google.maps.Map( document.getElementById(elementId), myOptions );
            $scope.marker = new google.maps.Marker( {position: latLng, map: $scope.map} );

            $scope.marker.setMap($scope.map);

            $scope.marker.setPosition(latLng);
            $scope.map.panTo(latLng);
            $scope.marker.setTitle($scope.ad.postedBy.geoLocation.address);

            $('#locationTab').on('shown.bs.tab', function (e) {
                google.maps.event.trigger($scope.map, "resize");
                $scope.map.panTo(latLng);
            });
        };

        $scope.tutionDetail();
    }
]);