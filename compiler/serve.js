const path = require('path');
const webpack = require('webpack');
const browserSync = require('browser-sync').create();

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config')({ dev: true });
const getPublicPath = require('./publicPath');

const compiler = webpack(config);

const middleware = [
  webpackDevMiddleware(compiler, {
    publicPath: '/assets/',
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
    target: 'http://wp4wp.loc',
    middleware
  },
  logLevel: 'silent',
  files: ['**/*.php'].map(element => path.resolve('../', element)),
  snippetOptions: {
    rule: {
      match:  /<\/head>/i,
      fn: function(snippet, match) {
        return `<script src="/assets/styles/main.js"></script>${snippet}${match}`
      }
    }
  }
});