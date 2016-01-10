describe("Controllers ->", function () {

    beforeEach(angular.mock.module("poorClaresApp"));

    describe("NavController ->", function () {

        var $scope,
            $rootScope: angular.IRootScopeService,
            siteSectionService,
            $location: angular.ILocationService,
            $window;

        beforeEach(inject(function (_$rootScope_, _$controller_, _$location_, _$window_) {

            $rootScope = _$rootScope_;
            $location = _$location_;
            $window = _$window_;

            $scope = $rootScope.$new();

            siteSectionService = {
                siteSection: "away",
                getSiteSection: function () { return siteSectionService.siteSection; }
            };

            _$controller_("NavController", {
                $scope: $scope,
                $rootScope: $rootScope,
                siteSectionService: siteSectionService
            });

            // Create fake ga (Google Analytics function) to spy on
            $window.ga = function (command, string, fields) { };
            spyOn($window, "ga");
        }));


        it("should set the default value of isCollapsed", function () {
            expect($scope.isCollapsed).toBe(true);
        });

        it("should set the default value of siteSection", function () {
            expect($scope.siteSection).toBe("away");
        });

        it("should toggle the value of isCollapsed when toggleCollapsed is called", function () {

            var isCollapsed = $scope.isCollapsed;

            $scope.toggleCollapsed();

            expect($scope.isCollapsed).toBe(!isCollapsed);
        });

        it("should watch for changes to the siteSection value", function () {

            var newSiteSection = "home";

            siteSectionService.siteSection = newSiteSection;

            $scope.$apply();

            expect($scope.siteSection).toBe(newSiteSection);
        });

        it("should set isCollapsed to true on $routeChangeStart event", function () {

            $scope.isCollapsed = false;

            $rootScope.$broadcast("$routeChangeStart", null);

            expect($scope.isCollapsed).toBe(true);
        });

        it("should send a pageview to Google Analytics on $routeChangeSuccess event", function () {

            $rootScope.$broadcast("$routeChangeSuccess", null);

            expect($window.ga).toHaveBeenCalledWith("send", "pageview", { page: $location.path() });
        });
    });
});
