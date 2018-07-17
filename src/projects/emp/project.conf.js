const path = require('path');
const baseconfig = require(path.resolve(__dirname, '../../config/webpack.config.js'));

baseconfig.publicPath = './';
module.exports = baseconfig;
