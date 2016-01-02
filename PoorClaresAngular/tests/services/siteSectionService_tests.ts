﻿describe("Services ->", function () {

    beforeEach(angular.mock.module("poorClaresApp"));

    describe("siteSectionService ->", function () {

        var siteSectionService: ISiteSectionService;

        beforeEach(function () {

            inject(function ($injector) {
                siteSectionService = $injector.get("siteSectionService");
            });
        });

        it("should set the default value of siteSection", function () {

            expect(siteSectionService.getSiteSection()).toBe("home");
        });

        it("should set siteSection to 'home'", function () {

            siteSectionService.determineSiteSection("/");
            expect(siteSectionService.getSiteSection()).toBe("home");
        });

        it("should set siteSection to 'main'", function () {

            siteSectionService.determineSiteSection("/hello");
            expect(siteSectionService.getSiteSection()).toBe("main");
        });

        it("should set siteSection to 'theConvent'", function () {

            siteSectionService.determineSiteSection("/theConvent/");
            expect(siteSectionService.getSiteSection()).toBe("theConvent");
        });
    });
});
