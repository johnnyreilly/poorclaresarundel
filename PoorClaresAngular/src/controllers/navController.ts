import { SiteSectionService } from '../services/siteSectionService';

/**
 * See https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference for docs
 */
export interface IWindowWithAnalyticsService extends ng.IWindowService {
    ga: (command: string, hitType: string, fields: {
        page: string;
        title?: string;
    }) => any;
}

export const navControllerName = "NavController";
export class NavController {

    cacheBuster: string;
    siteSection: string;
    isCollapsed: boolean;

    static $inject = ["$scope", "$rootScope", "siteSectionService", "$location", "$window"];
    constructor(
        private $scope: ng.IScope,
        private $rootScope: ng.IRootScopeService,
        private siteSectionService: SiteSectionService,
        private $location: ng.ILocationService,
        private $window: IWindowWithAnalyticsService) {

        this.cacheBuster = "?v=" + new Date().getTime();
        this.isCollapsed = true;
        this.siteSection = siteSectionService.getSiteSection();

        $scope.$watch(scope => siteSectionService.getSiteSection(), (newValue, oldValue, scope) => {
            this.siteSection = newValue;
        });

        $rootScope.$on("$routeChangeStart", (event, current, previous, rejection) => this.isCollapsed = true);
        $rootScope.$on("$routeChangeSuccess", (event, current, previous, rejection) => $window.ga("send", "pageview", { page: $location.path() }));
        $rootScope.$on("$routeChangeError", (event, current, previous, rejection) => {
            });
    }

    get showMain() {
        return this.siteSection === "main";
    }

    get showTheConvent() {
        return this.siteSection === "theConvent";
    }

    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }
}
