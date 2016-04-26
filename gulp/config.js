var path = require('path');
var root = path.resolve(__dirname + '/..');

module.exports = {
  theme: './',
  sass: 'sass',
  dist: 'dist',
  sassOptions: {
    includePaths: ['node_modules/'],
    outputStyle: 'expanded'
  }
}
