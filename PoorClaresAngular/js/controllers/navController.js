"use strict";
var poorClaresApp;
(function (poorClaresApp) {
    var controllers;
    (function (controllers) {
        var NavController = (function () {
            function NavController($scope, $rootScope, siteSectionService, $location, $window) {
                this.$scope = $scope;
                this.$rootScope = $rootScope;
                this.siteSectionService = siteSectionService;
                this.$location = $location;
                this.$window = $window;
                $scope.cacheBuster = "?v=" + new Date().getTime();
                $scope.isCollapsed = true;
                $scope.siteSection = siteSectionService.getSiteSection();
                $scope.toggleCollapsed = function () {
                    $scope.isCollapsed = !$scope.isCollapsed;
                };
                $scope.$watch(siteSectionService.getSiteSection, function (newValue, oldValue) {
                    $scope.siteSection = newValue;
                });
                $rootScope.$on("$routeChangeStart", function (event, current, previous, rejection) {
                    $scope.isCollapsed = true;
                });
                $rootScope.$on("$routeChangeSuccess", function (event, current, previous, rejection) {
                    $window.ga("send", "pageview", { page: $location.path() });
                });
                $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
                });
            }
            NavController.$inject = ["$scope", "$rootScope", "siteSectionService", "$location", "$window"];
            return NavController;
        })();
        angular.module("poorClaresApp.controllers").controller("NavController", NavController);
    })(controllers = poorClaresApp.controllers || (poorClaresApp.controllers = {}));
})(poorClaresApp || (poorClaresApp = {}));
//# sourceMappingURL=navController.js.map