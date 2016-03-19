import 'babel-polyfill';
import 'angular';
import 'angular-mocks';

const testsContext = require.context('./', true, /\.tests\.ts$/);
testsContext.keys().forEach(testsContext);
