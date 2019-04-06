module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,

  pwa: {
    name: 'Blalan Dev',
    themeColor: '#D0021B',
    msTileColor: '#D0021B'
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