var gulp = require("gulp");

gulp.task("install-bower-js-dependencies-into-project", function () {

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

gulp.task("install-bower-css-dependencies-into-project", function () {

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