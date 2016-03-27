import { appName, controllersModuleName, servicesModuleName, registerAndStartApp } from "../../src/app";
import { SiteSectionService } from "../../src/services/siteSectionService";
import { navControllerName, NavController, IWindowWithAnalyticsService } from "../../src/controllers/navController";

registerAndStartApp();

function getInjectable() {
    angular.mock.module(appName);

    let $controller: Function;

    let $scope: ng.IScope;
    let $rootScope: ng.IRootScopeService;
    let siteSectionService: SiteSectionService;
    let $location: ng.ILocationService;
    let $window: IWindowWithAnalyticsService;

    angular.mock.inject((
        _$controller_: Function,
        _$rootScope_: ng.IRootScopeService,
        _siteSectionService_: SiteSectionService,
        _$location_: ng.ILocationService,
        _$window_: IWindowWithAnalyticsService
    ) => {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        siteSectionService = _siteSectionService_;
        $location = _$location_;
    });

    return { $controller, $scope, $rootScope, siteSectionService, $location, $window };
}

function getNavController($controller: Function, dependencies: {}) {
    return $controller(navControllerName, dependencies) as NavController;
}

﻿describe("Controllers", () => {
    describe("NavController", () => {
        it("should set the default value of isCollapsed", () => {
            const { $controller, $scope } = getInjectable();
            const controller = getNavController($controller, { $scope });

            expect(controller.isCollapsed).toBe(true);
        });

        it("should set the default value of siteSection", () => {
            const { $controller, $scope } = getInjectable();
            const controller = getNavController($controller, { $scope });

            expect(controller.siteSection).toBe("home");
        });

        it("should toggle the value of isCollapsed when toggleCollapsed is called", () => {
            const { $controller, $scope } = getInjectable();
            const controller = getNavController($controller, { $scope });
            const isCollapsed = controller.isCollapsed;

            controller.toggleCollapsed();

            expect(controller.isCollapsed).toBe(!isCollapsed);
        });

        it("should watch for changes to the siteSection value", () => {
            const { $controller, $scope, siteSectionService } = getInjectable();
            const fakeSiteSectionService = {
                siteSection: "away",
                getSiteSection: function () { return siteSectionService.siteSection; }
            };
            const controller = getNavController($controller, { $scope, siteSectionService: fakeSiteSectionService });
            const newSiteSection = "home";
            siteSectionService.siteSection = newSiteSection;
            $scope.$apply();

            expect(controller.siteSection).toBe(newSiteSection);
        });

        it("should set isCollapsed to true on $routeChangeStart event", function () {
            const { $controller, $rootScope, $scope } = getInjectable();
            const controller = getNavController($controller, { $scope });

            controller.isCollapsed = false;

            $rootScope.$broadcast("$routeChangeStart", null);

            expect(controller.isCollapsed).toBe(true);
        });

        it("should send a pageview to Google Analytics on $routeChangeSuccess event", function () {
            const { $controller, $rootScope, $scope, $location } = getInjectable();
            const $window = {
              ga(command: string, hitType: string, fields: {
                  page: string;
                  title?: string;
              }) { }
            };
            const controller = getNavController($controller, { $scope, $window });
            spyOn($window, "ga");

            $rootScope.$broadcast("$routeChangeSuccess", null);

            expect($window.ga).toHaveBeenCalledWith("send", "pageview", { page: $location.path() });
        });
    });
});
