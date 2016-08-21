var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var webpackConfig = require('../../webpack.config.js');

var config = require('../config');

// browserSync
gulp.task('browser-sync', function() {
  browserSync({
    proxy: "http://192.168.33.10/"
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

// sass
gulp.task('sass', function() {
    return gulp.src(config.sass + '/!(_)*.{scss,sass}')
        .pipe(plumber({
          errorHandler: function(err) {
            console.log(err.messageFormatted);
            this.emit('end');
          }
        }))
        .pipe(sass(config.sassOptions))
        .pipe(gulp.dest(config.theme));
});

// webpack
gulp.task('webpack', function() {
  return gulp
    .src(config.js + '/main.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(config.theme))
});

var defaultTask = function(callback) {
  gulp.watch([config.js + '/**/*.js'], ['webpack'], ['bs-reload']);
  gulp.watch([config.sass + '/**/*.scss'], ['sass'], ['bs-reload']);
  gulp.watch([config.theme + '/**/*.css'], ['bs-reload']);
  gulp.watch([config.theme + '/**/*.js'], ['bs-reload']);
  gulp.watch([config.theme + '/**/*.php'], ['bs-reload']);
  callback();
}

gulp.task('default', ['browser-sync'], defaultTask);
