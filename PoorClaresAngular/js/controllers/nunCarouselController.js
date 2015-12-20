"use strict";
var poorClaresApp;
(function (poorClaresApp) {
    var controllers;
    (function (controllers) {
        var NunCarouselController = (function () {
            function NunCarouselController($scope) {
                this.$scope = $scope;
                $scope.myInterval = 3000;
                var slides = $scope.slides = [
                    {
                        image: "/images/main/Page2CommunityAtPrayer.JPG",
                        text: "Called to a life of prayer"
                    }, {
                        image: "/images/main/Page3SusannaAtPrayer.JPG",
                        text: "we seek to live the Gospel"
                    }, {
                        image: "/images/main/Page4ChapelGroupAtPrayer.JPG",
                        text: "in and for"
                    }, {
                        image: "/images/main/Page5GroupOnLawn.JPG",
                        text: "our world of today."
                    }, {
                        image: "/images/main/Page6YohaanaInLibrary.JPG",
                        text: "We share our lives"
                    }, {
                        image: "/images/main/Page7ProvidenceGroup.jpg",
                        text: "and all that we do."
                    }];
            }
            NunCarouselController.$inject = ["$scope"];
            return NunCarouselController;
        })();
        angular.module("poorClaresApp.controllers").controller("NunCarouselController", NunCarouselController);
    })(controllers = poorClaresApp.controllers || (poorClaresApp.controllers = {}));
})(poorClaresApp || (poorClaresApp = {}));
//# sourceMappingURL=nunCarouselController.js.map