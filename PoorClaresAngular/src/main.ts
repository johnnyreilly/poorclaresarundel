import "babel-polyfill";
import registerAndStartApp from "./app";

const appName = registerAndStartApp();
angular.element(document).ready(() => angular.bootstrap(document, [appName]));
