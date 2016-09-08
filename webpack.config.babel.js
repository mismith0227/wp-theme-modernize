import config from './config'
import path from 'path'
import webpack from 'webpack'

export default {
  devtool: '',
  entry: [
    path.join(__dirname, `${config.src}/js/main.js`)
  ],
  output: {
    path: path.join(__dirname, './'),
    filename: 'bundle.js'
  },
  module: {
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
