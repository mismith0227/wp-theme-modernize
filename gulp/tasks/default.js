var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var Svgpack = require('svgpack');
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

// SVG
gulp.task('svg', function () {
  var svg = new Svgpack(config.src + '/svg/*.svg', config.theme + 'svgpack')
  return svg.init()
})

gulp.task('svg:spriteRename', function () {
  return gulp
    .src(config.theme + 'svgpack/svgpack-sprite.svg')
    .pipe(rename('svgpack-sprite.php'))
    .pipe(gulp.dest(config.theme + 'template-parts'))
})

gulp.task('svg:cssRename', function () {
  return gulp
    .src(config.theme + 'svgpack/svgpack.css')
    .pipe(rename('_svgpack.scss'))
    .pipe(gulp.dest(config.sass + '/modules'))
})

// webpack
gulp.task('webpack', function() {
  return gulp
    .src(config.src + '/js/main.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(config.js))
});

gulp.task('watch', ['browser-sync'], function(callback) {
  gulp.watch([config.src + '/js/**/*.js'], ['webpack'], ['bs-reload']);
  gulp.watch([config.sass + '/**/*.scss'], ['sass'], ['bs-reload']);
  gulp.watch([config.theme + '/**/*.css'], ['bs-reload']);
  gulp.watch([config.theme + '/**/*.js'], ['bs-reload']);
  gulp.watch([config.theme + '/**/*.php'], ['bs-reload']);
  callback();
});


// Default
// =====================================================
gulp.task('default', function (cb) {
  return runSequence(
    ['build'],
    'watch',
    'browser-sync',
    cb
  )
})

// Build
// =====================================================
gulp.task('build', function (cb) {
  return runSequence(
    ['svg'],
    'svg:spriteRename',
    'svg:cssRename',
    ['sass', 'webpack'],
    cb
  )
})
