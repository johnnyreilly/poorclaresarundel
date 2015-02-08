"use strict";
var poorClaresApp;
(function (poorClaresApp) {
    var controllers;
    (function (controllers) {
        var MainController = (function () {
            function MainController($location, siteSectionService) {
                this.$location = $location;
                this.siteSectionService = siteSectionService;
                siteSectionService.determineSiteSection($location.path());
            }
            MainController.$inject = ["$location", "siteSectionService"];
            return MainController;
        })();
        angular.module("poorClaresApp.controllers").controller("MainController", MainController);
    })(controllers = poorClaresApp.controllers || (poorClaresApp.controllers = {}));
})(poorClaresApp || (poorClaresApp = {}));
//# sourceMappingURL=mainController.js.map