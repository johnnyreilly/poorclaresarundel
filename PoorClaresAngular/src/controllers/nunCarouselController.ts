interface Slide { image: string; text: string; }

interface CarouselScope extends ng.IScope {
    myInterval: number;
    addSlide: Function;
    slides: Slide[];
}

export const nunCarouselControllerName = "NunCarouselController";
export class NunCarouselController {

    static $inject = ["$scope"];
    constructor(
        private $scope: CarouselScope) {

        $scope.myInterval = 3000;
        const slides: Slide[] = $scope.slides = [
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

}
