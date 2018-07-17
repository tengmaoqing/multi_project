/*
* @Author: tengmaoqing
* @Date:   2018-05-01 11:13:03
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-05-11 14:30:10
*/

const config = require('../config')
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfigP = require('./webpack.dev.conf');

webpackConfigP.then(webpackConfig => {
  var compiler = webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
      colors: true
    },
    inline: true,
    progress: true
  });

  var server = new WebpackDevServer(compiler, devServerOptions);
  server.listen(config.dev.port, () => {
    console.log(`Starting server on http://localhost:${config.dev.port}`);
  });
});
