import { mainControllerName } from "./controllers/mainController";

const cacheBuster = "?v=" + new Date().getTime();

function getTheConventTemplateUrl(params: any) {
    const view = params.view || "home";
    return "templates/theConvent/" + view + ".html" + cacheBuster;
}

function getMainTemplateUrl(params: any) {
    const view = params.view || "home";
    return "templates/main/" + view + ".html" + cacheBuster;
}

configureRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
function configureRoutes(
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider) {

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

export default configureRoutes;