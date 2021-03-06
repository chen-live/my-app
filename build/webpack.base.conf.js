'use strict'
// path 模块
const path = require('path')
// utils 工具类
const utils = require('./utils')
// 引入config文件夹下index
const config = require('../config')
// vueloader
const vueLoaderConfig = require('./vue-loader.conf')

/**
 * __dirname 跳出一级 为my-app
 * return my-app/dir 
 */
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  /**
   * 指定入口文件上下文，为当前目录，而不是根目录
   * path.resolve(__dirname,'../')会被解析为__dirname/../,
   * 当前路径为 my-app/build/webpack.base.config.js,即context上下文将指向my-app/
   */
  context: path.resolve(__dirname, '../'),
  // 指定入口main.js
  entry: {
    app: './src/main.js'
  },
  // 输出
  output: {
    /**
     * @crossOriginLoading
     * false：禁用跨域加载
     * anonymous：不带凭证进行跨域
     * use-credentials：带凭证进行跨域
    */ 
    crossOriginLoading:'anonymous',
    // 输出文件目录，__dirname/dist=>src/dist
    path: config.build.assetsRoot,
    // 利用hash生成文件名
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 功能型函数
  resolve: {
    //定义模块查找顺序
    modules:[resolve('node_modules')],
    // 查找文件顺序
    extensions: ['.js', '.vue', '.json'],
    // 配置别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    noParse:function(content){
      return /lodash/.test(content);
    },
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
