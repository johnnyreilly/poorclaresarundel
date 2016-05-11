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
import configureRoutes from "./app.routes";

const controllersModuleName = "poorClaresAppControllers";
const servicesModuleName = "poorClaresAppServices";
const appName = "poorClaresApp";

function registerAndStartApp() {
    angular.module(controllersModuleName, [])
        .controller(mainControllerName, MainController)
        .controller(navControllerName, NavController)
        .controller(nunCarouselControllerName, NunCarouselController)
        .controller(prayerRequestControllerName, PrayerRequestController);

    angular.module(servicesModuleName, [])
        .service(prayerRequestServiceName, PrayerRequestService)
        .service(siteSectionServiceName, SiteSectionService);

    const app = angular.module(appName, [
        "ngAnimate",
        "ui.router",
        "ui.bootstrap",
        controllersModuleName,
        servicesModuleName
    ]);

    app.config(configureRoutes);

    return app.name;
}

export default registerAndStartApp;