const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/datafilter/',            // 公共,基本路径
  outputDir: process.env.NODE_ENV === 'development' ? 'devdist' : 'dist',
  assetsDir: 'static', // 默认会在目录同时生成三个静态目录：js,css,img
  filenameHashing: false, // 生成的静态资源名, 默认加了hash, 命名.后面的为hash：chunk-2d0aecf8.71e621e9
  lintOnSave: true, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: (config) => {
    Object.assign(config, { // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          'assets': path.resolve(__dirname, './src/assets'),
          'api': path.resolve(__dirname, './src/api'),
          'common': path.resolve(__dirname, './src/common')
        }
      }
    })
  },
  css: { // 配置高于chainWebpack中关于css loader的配置
    // modules: true, // 是否开启支持‘foo.module.css’样式
    extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
    sourceMap: true, // 是否在构建样式地图，false将提高构建速度
    loaderOptions: { // css预设器配置项
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      stylus: {}
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: { // 第三方插件配置
  },
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: true,
    port: 8085,
    https: false,
    hotOnly: false,
    // proxy: {
    //   '/Map': {
    //     target: 'http://192.168.3.58',
    //     pathRewrite: {
    //       '^/Map': '/'
    //     }
    //   }
    // }
  }
}
