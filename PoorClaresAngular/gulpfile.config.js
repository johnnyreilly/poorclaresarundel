var tsjsmapjsSuffix = ".{ts,js.map,js}";

var bower = "bower_components/";
var app = "js/";

var config = {

    base: ".",
    buildDir: "./build/",
    debug: "debug",
    release: "release",
    css: "css",

    bootFile: "index.html",
    bootjQuery: bower + "jquery/dist/jquery.min.js",

    images: "images/**/*.{gif,jpg,png}",

    // The scripts we want Gulp to process in addition to bower dependencies
    scripts: [
        app + "app" + tsjsmapjsSuffix,
        app + "controllers/*" + tsjsmapjsSuffix,
        app + "services/*" + tsjsmapjsSuffix
    ],

    // The styles we want Gulp to process
    styles: [
        "content/site.less"
    ],

    wiredepOptions: {
        exclude: [/jquery/],
        ignorePath: ".."
    }
};

config.debugFolder = config.buildDir + config.debug + "/";
config.releaseFolder = config.buildDir + config.release + "/";


module.exports = config;
