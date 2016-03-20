import { appName, registerAndStartApp } from '../src/app';
import { SiteSectionService } from '../src/services/siteSectionService';

registerAndStartApp();

function getInjectable() {
    angular.mock.module(appName);

    let $route: ng.route.IRouteService;
    let $location: ng.ILocationService;
    let $rootScope: ng.IRootScopeService;

    angular.mock.inject(($injector: ng.auto.IInjectorService) => {
        $route = $injector.get<ng.route.IRouteService>("$route");
        $location = $injector.get<ng.ILocationService>("$location");
        $rootScope = $injector.get<ng.IRootScopeService>("$rootScope");
    });

    return { $route, $location, $rootScope };
}

describe("Routes", () => {
    describe("$routeProvider", () => {
        it("should map the root url to the home screen", () => {
            const { $route } = getInjectable();
            expect($route.routes["/"].controller).toBe("MainController");
            expect($route.routes["/"].templateUrl).toMatch("templates/home.html");
        });

        it("should map urls that start '/theConvent/' to 'the Convent' site section", () => {
            const { $route } = getInjectable();
            expect($route.routes["/theConvent/:view"].controller).toBe("MainController");
            expect($route.routes["/theConvent/:view"].templateUrl({})).toMatch("templates/theConvent/home.html");
        });

        it("should map urls to the main site section", () => {
            const { $route } = getInjectable();
            expect($route.routes["/:view"].controller).toBe("MainController");
            expect($route.routes["/:view"].templateUrl({})).toMatch("templates/main/home.html");
        });

        it("should redirect other urls to the home screen", () => {
            const { $route } = getInjectable();
            expect($route.routes[(<any>null)].redirectTo).toBe("/");
        });
    });
});
