/*
* @Author: tengmaoqing
* @Date:   2018-04-13 17:03:52
* @Last Modified by:   tengmaoqing
* @Last Modified time: 2018-04-16 15:23:16
*/

const Vue = require('vue');
const express = require('express')
const server = express();
// const renderer = require('vue-server-renderer').createRenderer();
const { createBundleRenderer } = require('vue-server-renderer')

const serverBundle = require('../dist/h5base/vue-ssr-server-bundle.json');
const template = require('fs').readFileSync('./index.html', 'utf-8');
const clientManifest = require('../dist/h5base/vue-ssr-client-manifest.json');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template,
  clientManifest
});

// const createApp = require('/path/to/built-server-bundle.js');
server.use('/static', express.static('./dist/h5base/static'));
server.get('/*', (req, res) => {
  console.log('x');
  const context = { url: req.url };

  // createApp(context).then(app => {
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err);

      if (err.code === 404) {
        res.status(404).end('Page not found');
      } else {
        res.status(500).end('Internal Server Error');
      }
    } else {
      res.end(html);
    }
  });
  // });
});

server.listen(9000);
