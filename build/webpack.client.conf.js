/*
* @Author: tengmaoqing
* @Date:   2018-04-13 16:51:32
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-06-20 11:30:12
*/
const merge = require('webpack-merge')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const config = require('../config')
const baseConfig = require('./webpack.ssrbase.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseConfig, {
  // 将 entry 指向应用程序的 server entry 文件
  entry: {
    app: config.dev.entry
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    new VueSSRClientPlugin()
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (fs.existsSync(config.dev.theme) && config.projectConfig.theme) {
  webpackConfig.entry.theme = config.dev.theme;
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'theme',
    chunks: ['app']
  }));
}

module.exports = webpackConfig;
