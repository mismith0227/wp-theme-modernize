var gulp = require('gulp');
var del = require("del");

var config = require('../config');

// リリースフォルダ内のファイル削除
gulp.task('clean', function() {
  return del('./**/*.*');
});

// コピー（リリースフォルダ内を削除してコピー）
gulp.task('copy', ['clean'], function() {
  gulp.src([
    './**/*.*',
    "!./dist/**",
    "!./sass/**",
    "!./gulp/**",
    "!./gulpfile.js",
    "!package.json",
    "!./node_modules/**/*.*"
  ],
  { base: './' }
  )
  .pipe(gulp.dest(config.theme));
});

// リリースファイルのビルド
gulp.task('build', ['copy']);
