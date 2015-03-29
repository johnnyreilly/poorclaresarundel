"use strict";

// Declare controllers / services modules
angular.module("poorClaresApp.controllers", []);
angular.module("poorClaresApp.services", []);

// Declare app
angular.module("poorClaresApp", [
    "ngRoute",
    "ngAnimate",
    "ui.bootstrap",
    "poorClaresApp.controllers",
    "poorClaresApp.services"
])
.config(['$animateProvider',
    function ($animateProvider: ng.animate.IAnimateProvider) {
        $animateProvider.classNameFilter(/carousel/);
    }])
.config(["$routeProvider", "$locationProvider",
    function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {

        var cacheBuster = "?v=" + new Date().getTime();

        function getTheConventTemplateUrl(params: any) {
            var view = params.view || "home";
            return "partials/theConvent/" + view + ".html" + cacheBuster;
        }

        function getMainTemplateUrl(params: any) {
            var view = params.view || "home";
            return "partials/main/" + view + ".html" + cacheBuster;
        }

        $routeProvider.
        when("/", {
            templateUrl: "partials/home.html" + cacheBuster,
            controller: "MainController"
        }).
        when("/theConvent/:view", {
            templateUrl: getTheConventTemplateUrl,
            controller: "MainController",
            caseInsensitiveMatch: true
        }).
        when("/:view", {
            templateUrl: getMainTemplateUrl,
            controller: "MainController",
            caseInsensitiveMatch: true
        }).
        otherwise({
            redirectTo: "/"
        });

        $locationProvider.html5Mode(true);
    }]);
