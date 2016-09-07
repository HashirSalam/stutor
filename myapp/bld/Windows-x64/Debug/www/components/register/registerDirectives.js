var app = angular.module('stutor.register', ["ui.router"]);

app.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, RegisterController) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    RegisterController.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "mm/dd/yy",
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }
});