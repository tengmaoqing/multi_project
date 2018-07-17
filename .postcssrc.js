// https://github.com/michael-ciniawsky/postcss-load-config
const path = require('path');
const fs = require('fs');
const config = require('./config');
const projectConfigPath = path.resolve(__dirname, `./src/projects/${config.dev.projectName}/cssvar`);
const isProjectConfig = fs.existsSync(projectConfigPath + '/config.css');

const plugins = {
  "postcss-import": {
    path: [
      isProjectConfig ? projectConfigPath : path.resolve(__dirname, './src/rootcss'),
      path.resolve(__dirname, './src/')
    ]
  },
  "postcss-url": {},
  "precss": {},
  "rucksack-css": {},
  "postcss-cssnext": {},
  // to edit target browsers: use "browserslist" field in package.json
  // "autoprefixer": {}
};

const px2Rem = config.projectConfig.px2Rem;
if (Number(px2Rem)) {
  plugins['postcss-px2rem'] = {
    remUnit: Number(px2Rem)
  }
};

module.exports = {
  plugins
};
