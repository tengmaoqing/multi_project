'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
//
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk')

const getParamFromCLI = function(cliName) {
  const args = minimist(process.argv.slice(2));
  if (cliName) {
    return args[cliName];
  } else {
    return args;
  }
}

let projectName = getParamFromCLI('projectname') || getParamFromCLI()._[0];

if (!projectName) {
  console.log(chalk.red('need projectname. eg: node build/dev-server.js --projectname hbdx'));
  process.exit(0);
}

// const projectName = 'h5base';
const entry = 'entry-client.js';
const serverEntry = 'entry-server.js';
// const path = require('path');
const projectConfig = require(`../src/projects/${projectName}/project.conf`);
const publicPath = projectConfig.publicPath || `/${projectName}/`;

module.exports = {
  projectConfig,
  dev: {
    projectName,
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: `/dist/${projectName}/`,
    proxyTable: {},
    entry: `./src/projects/${projectName}/${entry}`,
    theme: `./src/projects/${projectName}/theme/index.js`,
    serverEntry: `./src/projects/${projectName}/${serverEntry}`,
    template: `./src/projects/${projectName}/index.html`,

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8090, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: '#eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {

    // Template for index.html
    index: path.resolve(__dirname, `../dist/${projectName}/index.html`),

    // Paths
    assetsRoot: path.resolve(__dirname, `../dist/${projectName}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: publicPath,

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
