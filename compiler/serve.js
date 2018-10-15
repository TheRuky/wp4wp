const path = require('path');
const webpack = require('webpack');
const browserSync = require('browser-sync').create();

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const { publicFolder, proxyTarget, watch } = require('./config');
const webpackConfig = require('./webpack.config')({ dev: true });
const getPublicPath = require('./publicPath');

const compiler = webpack(webpackConfig);

const middleware = [
  webpackDevMiddleware(compiler, {
    publicPath: getPublicPath(publicFolder),
    logLevel: 'silent',
    quiet: true
  }),
  webpackHotMiddleware(compiler, {
    log: false,
    logLevel: 'none'
  })
];

browserSync.init({
  middleware,
  proxy: {
    target: proxyTarget,
    middleware
  },
  logLevel: 'silent',
  files: watch.map(element => path.resolve(element)),
  snippetOptions: {
    rule: {
      match:  /<\/head>/i,
      fn: function(snippet, match) {
        return `<script src="${getPublicPath(publicFolder)}styles/main.js"></script>${snippet}${match}`;
      }
    }
  }
});