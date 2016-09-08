import pkg from './package.json'

const config = {
  src: 'src',
  dest: {
    css: './css',
    js: './js',
    svgpack: './svgpack'
  },
  localUrl: `${pkg.name}.dev`
}

export default config
