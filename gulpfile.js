var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');

var dir = {
  theme: './',
  sass: 'sass'
};

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
    return gulp.src(dir.sass + '/!(_)*.{scss,sass}')
        .pipe(plumber({
          errorHandler: function(err) {
            console.log(err.messageFormatted);
            this.emit('end');
          }
        }))
        .pipe(sass({
          outputStyle: 'expanded'
        }))
        .pipe(gulp.dest(dir.theme));
});

var defaultTask = function(callback) {
  gulp.watch([dir.sass + '/**/*.scss'], ['sass'], ['bs-reload']);
  gulp.watch([dir.theme + '/**/*.css'], ['bs-reload']);
  gulp.watch([dir.theme + '/**/*.js'], ['bs-reload']);
  gulp.watch([dir.theme + '/**/*.php'], ['bs-reload']);
  callback();
}

gulp.task('default', ['browser-sync'], defaultTask);
