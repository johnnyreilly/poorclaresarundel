import * as angular from "angular";
import "angular-animate";
import "angular-ui-bootstrap";
import "angular-ui-router";

import { mainControllerName, MainController } from "./controllers/mainController";
import { navControllerName, NavController } from "./controllers/navController";
import { nunCarouselControllerName, NunCarouselController } from "./controllers/nunCarouselController";
import { prayerRequestControllerName, PrayerRequestController } from "./controllers/prayerRequestController";
import { prayerRequestServiceName, PrayerRequestService } from "./services/prayerRequestService";
import { siteSectionServiceName, SiteSectionService } from "./services/siteSectionService";

// Declare controllers / services modules
export const controllersModuleName = "poorClaresAppControllers";
export const servicesModuleName = "poorClaresAppServices";
export const appName = "poorClaresApp";

export function registerAndStartApp() {
    angular.module(controllersModuleName, [])
        .controller(mainControllerName, MainController)
        .controller(navControllerName, NavController)
        .controller(nunCarouselControllerName, NunCarouselController)
        .controller(prayerRequestControllerName, PrayerRequestController);

    angular.module(servicesModuleName, [])
        .service(prayerRequestServiceName, PrayerRequestService)
        .service(siteSectionServiceName, SiteSectionService);

    // Declare app
    const app = angular.module(appName, [
        "ngAnimate",
        "ui.router",
        "ui.bootstrap",
        controllersModuleName,
        servicesModuleName
    ]);

    configureRoutes(app);

    return app.name;
}

function configureRoutes(app: ng.IModule) {
    app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", configure]);
    function configure(
            $stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider,
            $locationProvider: ng.ILocationProvider) {

        const cacheBuster = "?v=" + new Date().getTime();

        function getTheConventTemplateUrl(params: any) {
            const view = params.view || "home";
            return "templates/theConvent/" + view + ".html" + cacheBuster;
        }

        function getMainTemplateUrl(params: any) {
            const view = params.view || "home";
            return "templates/main/" + view + ".html" + cacheBuster;
        }

        $urlRouterProvider.otherwise("home");

        $stateProvider.
            state("home", {
                url: "/",
                templateUrl: "templates/home.html" + cacheBuster,
                controller: mainControllerName
            }).
            state("the-convent", {
                url: "/theConvent/:view",
                templateUrl: getTheConventTemplateUrl,
                controller: mainControllerName
            }).
            state("main", {
                url: "/:view",
                templateUrl: getMainTemplateUrl,
                controller: mainControllerName
            });

        $locationProvider.html5Mode(true);
    }
}