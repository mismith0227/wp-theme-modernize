import config from './config'
import path from 'path'
import webpack from 'webpack'

export default {
  devtool: '',
  entry: [
    path.join(__dirname, `${config.src}/js/app.js`)
  ],
  output: {
    path: path.join(__dirname, './'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'standard'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      IScroll: 'iscroll'
    })
  ],
  externals: {
    jquery: 'window.jQuery'
  }
}
