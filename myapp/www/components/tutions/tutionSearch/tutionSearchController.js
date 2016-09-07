var app = angular.module('stutor.tutionSearch', ["ui.router"]);

app.config([              //Routing
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tutionSearch', {
                url: '/tutionSearch',
                templateUrl: "components/tutions/tutionSearch/tutionSearchView.html",
                controller: "tutionSearchController",
                controllerAs: "tutionSearchCtrl"
            });
    }]);

app.controller('tutionSearchController', ['$scope', '$http', '$location',"tutionSearchData",      //Controller
    function ($scope, $http, $location, tutionSearchData) {
        $scope.searchOptions = {};
        $scope.geoLocation = {latLng: null, address: ""};

        $scope.tutions = [];
        $scope.mapFunctions = {};
        $scope.mapFunctions.initializeMap = function(elementId) {
            var latLng  = new google.maps.LatLng(0,0);
            if($scope.geoLocation.latLng){
                latLng = $scope.geoLocation.latLng;
            }
            var myOptions = {
                zoom: 16,
                center: latLng
            };
            $scope.map = new google.maps.Map( document.getElementById(elementId), myOptions );
            $scope.marker = new google.maps.Marker( {position: latLng, map: $scope.map} );

            $scope.marker.setMap($scope.map);

            var input = document.getElementById('searchTextField');
            $scope.locationBox = new google.maps.places.Autocomplete(input);
            $scope.locationBox.addListener('place_changed', function() {
                var place = $scope.locationBox.getPlace();
                if (!place.geometry) {
                    console.log("Autocomplete's returned place contains no geometry");
                    $scope.geoLocation.address = "";
                }
                else{
                    $scope.geoLocation.latLng = place.geometry.location;

                    $scope.geoLocation.address = place.formatted_address;
                    $scope.mapFunctions.updateMapMarker($scope.geoLocation.latLng);
                    $scope.mapFunctions.refreshMarkerDetails();
                    console.log("Selected area: "+ $scope.geoLocation.latLng);
                    console.log($scope.geoLocation.address);
                }
            });
            $scope.map.addListener('click', function(e) {
                $scope.mapFunctions.updateMapMarker (e.latLng);
                $scope.geoLocation.latLng = e.latLng;
                $scope.mapFunctions.reverseGeolocate($scope.geoLocation.latLng);

            });

            //If no location is set then get user current location
            if(!$scope.geoLocation.latLng){
                $scope.mapFunctions.getUserLocation();
            }
            else{
                $scope.mapFunctions.reverseGeolocate($scope.geoLocation.latLng);
            }
        };
        $scope.mapFunctions.updateMapMarker = function(latLng){
            $scope.marker.setPosition(latLng);
            $scope.map.panTo(latLng);
            $scope.geoLocation.latLng = latLng;
        };
        $scope.mapFunctions.getUserLocation = function() {
            console.log("Detecting location");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var latLng2 = new google.maps.LatLng(lat,lng);
                    $scope.geoLocation.latLng = latLng2;
                    $scope.mapFunctions.updateMapMarker($scope.geoLocation.latLng);
                    $scope.mapFunctions.reverseGeolocate($scope.geoLocation.latLng);
                    console.log("Your are at: "+ $scope.geoLocation.latLng);
                    if($scope.isSearchBeforeLocation){
                        $scope.searchtutions();
                        $scope.isSearchBeforeLocation = false;
                    }
                });
            }
        };
        $scope.mapFunctions.reverseGeolocate = function(latLng){
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        console.log(results[1].formatted_address);
                        $scope.geoLocation.address = results[1].formatted_address;
                        document.getElementById('searchTextField').value = $scope.geoLocation.address;
                    } else {
                        console.log('Location not found');
                        $scope.geoLocation.address = "";
                        document.getElementById('searchTextField').value = $scope.geoLocation.address;
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                    $scope.geoLocation.address = "";
                    document.getElementById('searchTextField').value = $scope.geoLocation.address;
                }
                $scope.mapFunctions.refreshMarkerDetails();
            });
        };
        $scope.mapFunctions.refreshMarkerDetails = function () {
            $scope.marker.setTitle($scope.geoLocation.address);
        };

        $scope.minDistance = 1;
        $scope.maxDistance = 500;
        $scope.changeDistance = function (operator){
            if(operator == '-'){
                if($scope.searchOptions.range > $scope.minDistance)
                    $scope.searchOptions.range--;
            }
            else{
                if($scope.searchOptions.range < $scope.maxDistance)
                    $scope.searchOptions.range++;
            }
        };

        $scope.searchtutions = function () {
            $scope.searchOptions.geoLocation.latLng = $scope.geoLocation.latLng;

            var temp = $scope.searchOptions;
            if($scope.searchOptions.geoLocation.latLng){
                temp.geoLocation.latLng = {
                    lat: $scope.searchOptions.geoLocation.latLng.lat(),
                    lng: $scope.searchOptions.geoLocation.latLng.lng()
                }
            }
            tutionSearchData.setData($scope.searchOptions);

            var config = {
                params: {searchOptions: $scope.searchOptions},
                headers : {'Accept' : 'application/json'}
            };
            $http.get('/api/tutionSearch', config)
                .success(function(res){
                    console.log(res);
                    $scope.tutions = res;
                    $scope.pagination($scope.tutions.length);
                })
                .error(function (res) {
                    console.log("error");
                    console.log(res);
                });
        };

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

        $scope.searchOptions = tutionSearchData.getData();
        console.log($scope.searchOptions);
        if($scope.searchOptions.geoLocation.latLng){
            $scope.geoLocation.latLng = new google.maps.LatLng(
                $scope.searchOptions.geoLocation.latLng.lat,
                $scope.searchOptions.geoLocation.latLng.lng
            );
            console.log($scope.searchOptions.geoLocation.latLng.lat);
            console.log("s");
            $scope.isSearchBeforeLocation = false;
        }
        else{
            $scope.isSearchBeforeLocation = true;
        }
        $scope.searchtutions();
        $scope.mapFunctions.initializeMap("map-canvas");
    }
]);