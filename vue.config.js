module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,

  pwa: {
    name: 'blalan_dev'
  },

  devServer: {
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        fiber: require('fibers')
      }
    }
  }
}