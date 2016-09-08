import browserSync, {reload, stream} from 'browser-sync'
import chalk from 'chalk'
import config from './config'
import del from 'del'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
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

const source = config.src

// CLEAN
// =====================================================
gulp.task('clean', (cb) => {
  return del([
    './svgpack',
    './css',
    './js/bundle*.js'
  ], cb)
})

// css
// =====================================================
gulp.task('css', () => {
  const processors = [
    require('postcss-import'),
    require('postcss-custom-properties'),
    require('postcss-custom-media'),
    require('postcss-apply'),
    require('postcss-nesting'),
    require('postcss-flexbugs-fixes'),
    require('autoprefixer'),
    require('postcss-browser-reporter')({ selector: 'body:before' }),
    require('postcss-reporter')({ clearMessages: true })
  ]
  const beforeReporter = processors.length - 2

  if (production) processors.splice(beforeReporter, 0, require('csswring'))

  return gulp
    .src(`${source}/css/app.css`)
    .pipe(gulpIf(!production, sourcemaps.init()))
    .pipe(postcss(processors))
    .pipe(gulpIf(!production, sourcemaps.write()))
    .pipe(gulp.dest(config.dest.css))
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
    .src(`${source}/js/main.js`)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(config.dest.js))
})

// SVG
// =====================================================
gulp.task('svg', () => {
  var svg = new Svgpack(`${source}/svg/*.svg`, config.dest.svgpack)
  svg.init()
})

gulp.task('svg:rename', () => {
  return gulp
    .src(`${config.dest.svgpack}svgpack-sprite.svg`)
    .pipe(rename('svgpack-sprite.php'))
    .pipe(gulp.dest('./template-parts'))
})

// Server
// =====================================================
gulp.task('server', () => {
  return browserSync.init({
    proxy: config.localUrl,
    open: 'external'
  })
})

// Watch
// =====================================================
gulp.task('watch', () => {
  gulp.watch([`${source}/js/**/*.js`], ['webpack'])
  gulp.watch([`${source}/css/**/*.css`], ['css'])
  gulp.watch([
    './**/*.php',
    `${config.dest.js}/*.js`
  ]).on('change', reload)
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
    'svg:rename',
    cb
  )
})
