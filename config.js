import pkg from './package.json'

const config = {
  src: 'src',
  localUrl: `wocker.test`
}

const tasks = {
  cleanup: [
    './svgpack',
    './css',
    './js/bundle*.js'
  ],
  css: {
    processors: [
      require('postcss-import'),
      require('postcss-custom-properties'),
      require('postcss-custom-media'),
      require('postcss-apply'),
      require('postcss-nesting'),
      require('postcss-flexbugs-fixes'),
      require('autoprefixer'),
      require('postcss-browser-reporter')({
        selector: 'body:before'
      }),
      require('postcss-reporter')({
        clearMessages: true
      })
    ],
    minifyLib: require('csswring'),
    src: [
      `${config.src}/css/style.css`,
      `${config.src}/css/editor-style.css`
    ],
    dest: './'
  },
  webpack: {
    src: `${config.src}/js/app.js`,
    dest: './js',
    filename: 'bundle.js'
  },
  images: {
    src: `${config.src}/images/**/*`,
    dest: './images'
  },
  svg: {
    src: `${config.src}/svg/*.svg`,
    dest: './svgpack'
  },
  svgRename: {
    src: './svgpack/svgpack-sprite.svg',
    dest: './template-parts',
    filename: 'svgpack-sprite.php'
  },
  server: {
    browserSyncOptions: {
      proxy: config.localUrl,
      open: 'external'
    }
  },
  watch: {
    css: [`${config.src}/css/**/*.css`],
    webpack: [`${config.src}/js/**/*.js`],
    reload: [
      './**/*.php',
      './js/*.js'
    ]
  }
}

config.tasks = tasks
export default config
