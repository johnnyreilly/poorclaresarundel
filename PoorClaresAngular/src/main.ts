import "babel-polyfill";
import registerApp from "./app";

const appName = registerApp();
angular.element(document).ready(() => angular.bootstrap(document, [appName]));
