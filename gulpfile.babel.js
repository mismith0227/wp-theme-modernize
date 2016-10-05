import browserSync, {reload, stream} from 'browser-sync'
import chalk from 'chalk'
import config from './config'
import del from 'del'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import imagemin from 'gulp-imagemin'
import minimist from 'minimist'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import pkg from './package.json'
import rename from 'gulp-rename'
import runSequence from 'run-sequence'
import sourcemaps from 'gulp-sourcemaps'
import Svgpack from 'svgpack'
import webpack from 'webpack'
import webpackConfig from './webpack.config.babel'
import webpackStream from 'webpack-stream'

const envSettings = {
  string: `env`,
  default: {
    env: process.env.NODE_ENV || 'development'
  }
}
const options = minimist(process.argv.slice(2), envSettings)
const production = options.env === 'production'
const logHeader = [
  '-------------------------------------',
  '',
  ` Theme: ${chalk.bold.green(pkg.name)} v${pkg.version}`,
  ` Env:   ${chalk.blue(options.env)}`,
  '',
  '-------------------------------------'
].join('\n')

console.log(logHeader)

// CLEAN
// =====================================================
gulp.task('clean', (cb) => {
  return del(config.tasks.cleanup, cb)
})

// css
// =====================================================
gulp.task('css', () => {
  const processors = config.tasks.css.processors
  const beforeReporter = processors.length - 2

  // if (production) processors.splice(beforeReporter, 0, config.tasks.css.minifyLib)

  return gulp
    .src(config.tasks.css.src)
    .pipe(gulpIf(!production, sourcemaps.init()))
    .pipe(postcss(processors))
    .pipe(gulpIf(!production, sourcemaps.write()))
    .pipe(gulp.dest(config.tasks.css.dest))
    .pipe(stream())
})

// Webpack
// =====================================================
gulp.task('webpack', () => {
  if (production) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
  } else {
    webpackConfig.devtool = 'source-map'
  }
  return gulp
    .src(config.tasks.webpack.src)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(config.tasks.webpack.dest))
})

// Image
// =====================================================
gulp.task('image', () => {
  return gulp
    .src(config.tasks.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(config.tasks.images.dest))
});

// SVG
// =====================================================
gulp.task('svg', () => {
  var svg = new Svgpack(config.tasks.svg.src, config.tasks.svg.dest)
  svg.init()
})

gulp.task('svg:rename', () => {
  return gulp
    .src(config.tasks.svgRename.src)
    .pipe(rename(config.tasks.svgRename.filename))
    .pipe(gulp.dest(config.tasks.svgRename.dest))
})

// Server
// =====================================================
gulp.task('server', () => {
  return browserSync.init(config.tasks.server.browserSyncOptions)
})

// Watch
// =====================================================
gulp.task('watch', () => {
  const props = []
  Object.keys(config.tasks.watch).forEach(function (key) {
    let task
    if (key === 'reload') {
      task = gulp.watch(config.tasks.watch[key]).on('change', reload)
    } else {
      task = gulp.watch(config.tasks.watch[key], [key])
    }
    return props.push(task)
  })
  return props
})

// Default
// =====================================================
gulp.task('default', (cb) => {
  return runSequence(
    ['build'],
    'watch',
    'server',
    cb
  )
})

// Build
// =====================================================
gulp.task('build', (cb) => {
  return runSequence(
    'clean',
    ['svg'],
    'css',
    'webpack',
    'image',
    'svg:rename',
    cb
  )
})
