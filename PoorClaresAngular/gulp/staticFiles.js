'use strict';

var gulp = require('gulp');
var cache = require('gulp-cached');

var targets = [
  //{ description: 'font-awesome-fonts', src: './bower_components/font-awesome/fonts/**/*.*', dest: './dist/fonts' },
  { description: 'jquery-ui-images', src: 'static-files/**/*.*', dest: './dist/' },
  { description: 'templates', src: './src/**/*.html', dest: './dist/templates' }
];

function copy(options) {
  function run(target) {
    gulp.src(target.src)
      .pipe(cache(target.description))
      .pipe(gulp.dest(target.dest));
  }

  function watch(target) {
    gulp.watch(target.src, function() { run(target); });
  }

  targets.forEach(run);

  if (options.shouldWatch) {
    targets.forEach(watch);
  }
}

module.exports = {
  build: function() { return copy({ shouldWatch: false }); },
  watch: function() { return copy({ shouldWatch: true }); }
};
