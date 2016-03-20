import * as angular from 'angular';
import 'angular-animate'
import 'angular-route';
import 'angular-ui-bootstrap';

import { mainControllerName, MainController } from './controllers/mainController';
import { navControllerName, NavController } from './controllers/navController';
import { nunCarouselControllerName, NunCarouselController } from './controllers/nunCarouselController';
import { prayerRequestControllerName, PrayerRequestController } from './controllers/prayerRequestController';
import { prayerRequestServiceName, PrayerRequestService } from './services/prayerRequestService';
import { siteSectionServiceName, SiteSectionService } from './services/siteSectionService';

// Declare controllers / services modules
export const controllersModuleName = "poorClaresAppControllers";
export const servicesModuleName = "poorClaresAppServices";
export const appName = "poorClaresApp";

export function registerAndStartApp() {
  angular.module(controllersModuleName, [])
  .controller(mainControllerName, MainController)
  .controller(navControllerName, NavController)
  .controller(nunCarouselControllerName, NunCarouselController)
  .controller(prayerRequestControllerName, PrayerRequestController);

  angular.module(servicesModuleName, [])
  .service(prayerRequestServiceName, PrayerRequestService)
  .service(siteSectionServiceName, SiteSectionService);

  // Declare app
  angular.module(appName, [
      "ngRoute",
      "ngAnimate",
      "ui.bootstrap",
      controllersModuleName,
      servicesModuleName
  ])
  .config(["$routeProvider", "$locationProvider",
      function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {

          var cacheBuster = "?v=" + new Date().getTime();

          function getTheConventTemplateUrl(params: any) {
              var view = params.view || "home";
              return "partials/theConvent/" + view + ".html" + cacheBuster;
          }

          function getMainTemplateUrl(params: any) {
              var view = params.view || "home";
              return "partials/main/" + view + ".html" + cacheBuster;
          }

          $routeProvider.
          when("/", {
              templateUrl: "partials/home.html" + cacheBuster,
              controller: mainControllerName
          }).
          when("/theConvent/:view", {
              templateUrl: getTheConventTemplateUrl,
              controller: mainControllerName,
              caseInsensitiveMatch: true
          }).
          when("/:view", {
              templateUrl: getMainTemplateUrl,
              controller: mainControllerName,
              caseInsensitiveMatch: true
          }).
          otherwise({
              redirectTo: "/"
          });

          $locationProvider.html5Mode(true);
      }]);
}
