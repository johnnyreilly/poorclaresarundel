var gulp = require("gulp");

var concat = require("gulp-concat");
var ignore = require("gulp-ignore");
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var cssNano = require("gulp-cssnano");
var uglify = require("gulp-uglify");
var rev = require("gulp-rev");
var path = require("path");
var eventStream = require("event-stream");
var gulpUtil = require("gulp-util");
var del = require("del");
var wiredep = require("wiredep");
var yargs = require("yargs").argv;
var order = require("gulp-order");
var inject = require("gulp-inject");

var config = require("./gulpfile.config.js");

var isDebug = yargs.mode === "Debug";
gulpUtil.log(gulpUtil.colors.green("isDebug: " + isDebug));

/**
 * Get the scripts or styles the app requires by combining bower dependencies and app dependencies
 * 
 * @param {string} jsOrCss Should be "js" or "css" or "less"
 */
function getScriptsOrStyles(jsOrCss) {
    var bowerScriptsOrStylesAbsolute = wiredep(config.wiredepOptions)[jsOrCss];
    var bowerScriptsOrStylesRelative = bowerScriptsOrStylesAbsolute.map(function makePathRelativeToCwd(file) {
        return path.relative('', file);
    });

    var appScriptsOrStyles = bowerScriptsOrStylesRelative.concat(jsOrCss === "js" ? config.scripts : []);

    return appScriptsOrStyles;
}

/**
 * Get the scripts the app requires
 */
function getScripts() {

    // Exclude bootstrap.js from the injected scripts
    var bowerScripts = getScriptsOrStyles("js").filter(function(scriptName) {
        return scriptName.indexOf("bootstrap.js") === -1;
    });

    var scripts = [].concat(bowerScripts, config.scripts);

    return scripts;
}

/**
 * Get the scripts the app requires
 */
function getScriptsStream(isDebug) {

    var options = isDebug ? { base: config.base } : undefined;
    var scriptsStream = gulp.src(getScripts(), options);

    return scriptsStream;
}

/**
 * Get the styles the app requires
 */
function getStyles() {

    return getScriptsOrStyles("less");
}


gulp.task("clean", function (done) {

    gulpUtil.log("Delete installed build folder");

    del([config.buildDir + "**/*"], { force: false })
      .then(function (paths) {
          gulpUtil.log('Deleted files/folders:\n', paths.join('\n'));
          done();
      })
      .catch(function (error) {
          gulpUtil.log('Problem deleting:\n', error);
          done(error);
      });
});

gulp.task("scripts-debug", ["clean"], function () {

    gulpUtil.log("Copy across all JavaScript files to build/debug");

    return getScriptsStream(true)
        .pipe(gulp.dest(config.debugFolder));
});

gulp.task("scripts-release", ["clean"], function () {

    gulpUtil.log("Concatenate & Minify JS for release into a single file");

    return getScriptsStream(false)
        .pipe(ignore.exclude("**/*.{ts,js.map}")) // Exclude ts and js.map files - not needed in release mode
        .pipe(concat("app.js"))                   // Make a single file                                                         
        .pipe(uglify())                           // Make the file titchy tiny small
        .pipe(rev())                              // Suffix a version number to it
        .pipe(gulp.dest(config.releaseFolder));   // Write single versioned file to build/release folder
});

gulp.task("styles-debug", ["clean"], function () {

    gulpUtil.log("Copy across all CSS files to build/debug");

    var bowerCss = gulp.src(getStyles(), { base: config.base });

    var appCss = gulp.src(config.styles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write());

    return eventStream.merge(bowerCss, appCss)
        .pipe(gulp.dest(config.debugFolder));
});

gulp.task("styles-release", ["clean"], function () {

    gulpUtil.log("Copy across all files in config.styles to build/debug");

    var bowerCss = gulp.src(getStyles()).pipe(less());
    var appCss = gulp.src(config.styles).pipe(less());

    return eventStream.merge(bowerCss, appCss)
        .pipe(concat("app.css"))                // Make a single file
        .pipe(cssNano())                        // Make the file titchy tiny small
        .pipe(rev())                            // Suffix a version number to it
        .pipe(gulp.dest(config.releaseFolder)); // Write single versioned file to build/release folder
});

gulp.task("inject-debug", ["styles-debug", "scripts-debug"], function () {

    gulpUtil.log("Inject debug links and script tags into " + config.bootFile);

    var scriptsAndStyles = [].concat(getScripts(), getStyles());

    return gulp
        .src(config.bootFile)
        .pipe(inject(
                gulp.src([config.debugFolder + "**/*.{js,css}"], { read: false }).pipe(order(scriptsAndStyles)),
                { relative: true, ignorePath: config.buildDir.substring(1) })
            )
        .pipe(gulp.dest(config.buildDir));
});

gulp.task("inject-release", ["styles-release", "scripts-release"], function () {

    gulpUtil.log("Inject release links and script tags into " + config.bootFile);

    return gulp
        .src(config.bootFile)
        .pipe(inject(gulp.src(config.releaseFolder + "**/*.{js,css}", { read: false }), { removeTags: true, ignorePath: config.buildDir.substring(1) }))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task("fonts", ["clean"], function () {

    gulpUtil.log("Copy across all files static files to build");

    return gulp
        .src("./bower_components/bootstrap/fonts/**/*.*", { base: "./bower_components/bootstrap/" })
        .pipe(gulp.dest(config.buildDir));
});

gulp.task("static-files", ["clean"], function () {

    gulpUtil.log("Copy across all files static files to build");

    return gulp
        .src(config.staticFiles)
        .pipe(gulp.dest(config.buildDir));
});

gulp.task("build",
    ["fonts", "static-files",
     isDebug ? "inject-debug" : "inject-release"],
    function () {

    });

gulp.task("default",
    ["build"],
    function () {
        // place code for your default task here
    });
