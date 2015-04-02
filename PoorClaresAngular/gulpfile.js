var gulp = require("gulp");
var gulpUtil = require("gulp-util");
var del = require("del");
var yargs = require("yargs").argv;

var isDebug = yargs.mode === "Debug";
gulpUtil.log(gulpUtil.colors.green("isDebug: " + isDebug));

gulp.task("clean", function (cb) {

    gulpUtil.log("Delete installed bower assets");

    return del([
        "./content/fonts",
        "./content/less",
        "./scripts/*.js/"
    ], { force: false },
    cb);
});

gulp.task("install-bower-js-dependencies-into-project", ["clean"], function () {

    return gulp
        .src([
            "./bower_components/jquery/dist/jquery.js",
            "./bower_components/angular/angular.js",
            "./bower_components/angular-animate/angular-animate.js",
            "./bower_components/angular-route/angular-route.js",
            "./bower_components/angular-bootstrap/ui-bootstrap-tpls.js"
        ])
        .pipe(gulp.dest("./scripts"));
});

gulp.task("install-bower-css-dependencies-into-project", ["clean"], function () {

    return gulp
        .src([
            "./bower_components/bootstrap/fonts/*.*",
            "./bower_components/bootstrap/less/**/*.less"
        ], { base: "./bower_components/bootstrap" })
        .pipe(gulp.dest("./content/"));
});

gulp.task("default",
    ["install-bower-js-dependencies-into-project", "install-bower-css-dependencies-into-project"],
    function () {
        // place code for your default task here
});
