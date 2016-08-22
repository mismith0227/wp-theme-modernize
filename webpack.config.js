const config = require('./gulp/config')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  cache: true,
  debug: true,
  devtool: '',
  entry: {
    main: path.join(__dirname, config.src + '/js/main.js'),
  },
  output: {
    path: path.join(__dirname, config.theme),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      IScroll: 'iscroll',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  externals: {
    jquery: 'window.jQuery',
  },
}
