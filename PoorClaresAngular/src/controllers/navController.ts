import { SiteSectionService } from '../services/siteSectionService';

export interface INavControllerScope extends ng.IScope {
    toggleCollapsed: () => void;
    isCollapsed: boolean;
    siteSection: string;
    cacheBuster: string;
}

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

    static $inject = ["$scope", "$rootScope", "siteSectionService", "$location", "$window"];
    constructor(
        private $scope: INavControllerScope,
        private $rootScope: ng.IRootScopeService,
        private siteSectionService: SiteSectionService,
        private $location: ng.ILocationService,
        private $window: IWindowWithAnalyticsService) {

        $scope.cacheBuster = "?v=" + new Date().getTime();
        $scope.isCollapsed = true;
        $scope.siteSection = siteSectionService.getSiteSection();

        $scope.toggleCollapsed = () => {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        $scope.$watch(siteSectionService.getSiteSection, (newValue, oldValue) => {
            $scope.siteSection = newValue;
        });

        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $scope.isCollapsed = true;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $window.ga("send", "pageview", { page: $location.path() });
            });
        $rootScope.$on("$routeChangeError",
            function (event, current, previous, rejection) {

            });
    }
}