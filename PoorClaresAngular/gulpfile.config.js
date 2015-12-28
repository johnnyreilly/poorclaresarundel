var tsjsmapjsSuffix = ".{ts,js.map,js}";

var bower = "bower_components/";
var app = "js/";

var config = {

    base: ".",
    buildDir: "./build/",
    debug: "debug",
    release: "release",

    bootFile: "index.html",
    bootjQuery: bower + "jquery/dist/jquery.min.js",

    staticFiles: [
        "favicon.ico",
        "googleb63c56db6d7860ff.html",
        "sitemap.txt",
        "fonts/**/*.*",
        "images/**/*.{gif,jpg,png}",
        "partials/**/*.html",
        "static/**/*.*"
    ],

    // The scripts we want Gulp to process in addition to bower dependencies
    scripts: [
        app + "app" + tsjsmapjsSuffix,
        app + "controllers/*" + tsjsmapjsSuffix,
        app + "services/*" + tsjsmapjsSuffix
    ],

    // The styles we want Gulp to process
    styles: [
        "css/site.less"
    ],

    wiredepOptions: {
        exclude: [/jquery/],
        ignorePath: ".."
    }
};

config.debugFolder = config.buildDir + config.debug + "/";
config.releaseFolder = config.buildDir + config.release + "/";


module.exports = config;
