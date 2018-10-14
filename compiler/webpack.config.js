const path = require('path');
const webpack = require('webpack');

const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NonJsEntryCleanupPlugin = require('./non-js-entry-cleanup-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const HMR = require('./hmr');
const getPublicPath = require('./publicPath');

module.exports = (options) => {
  const { dev } = options;
  const entry = {
    styles: './styles/main.scss',
    scripts: './scripts/main.js'
  }
  const hmr = HMR.getClient();

  return {
    mode: dev ? 'development' : 'production',
    devtool: dev ? 'cheap-module-eval-source-map' : false,
    context: path.resolve('assets'),
    entry: {
      'styles/main': dev ? [hmr, entry.styles] : entry.styles,
      'scripts/main': dev ? [hmr, entry.scripts] : entry.scripts,
      // main: dev ? [hmr, entry.scripts, entry.styles] : [entry.scripts, entry.styles]
    },
    output: {
      path: path.resolve('../assets'),
      publicPath: '/assets/',
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)\/(?!(dom7|ssr-window|swiper)\/).*/,
          use: [
            ...(dev ? [{ loader: 'cache-loader' }] : []),
            { loader: 'babel-loader' }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            ...(dev ? [{ loader: 'cache-loader' }, { loader: 'style-loader', options: { sourceMap: dev } }] : [MiniCssExtractWebpackPlugin.loader]),
            { loader: 'css-loader', options: { sourceMap: dev } },
            { loader: 'postcss-loader', options: {
              ident: 'postcss',
              sourceMap: dev,
              config: { ctx: { dev } }
            } },
            { loader: 'resolve-url-loader', options: { sourceMap: dev } },
            { loader: 'sass-loader', options: { sourceMap: true, sourceMapContents: dev } },
          ]
        },
        {
          test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico|mp4|webm)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              }
            }
          ]
        }
      ]
    },
    plugins: [
      ...(dev ? [
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin()
      ] : [
        new MiniCssExtractWebpackPlugin({
          filename: '[name].css'
        }),
        new NonJsEntryCleanupPlugin({
          context: 'styles',
          extensions: 'js',
          includeSubfolders: true
        }),
        new CleanWebpackPlugin([
          path.resolve('../assets')
        ], {
          allowExternal: true,
          beforeEmit: true
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve('assets/**/*'),
            to: path.resolve('../assets'),
          }
        ], {
          ignore: [ '*.js', '*.scss', '*.css' ]
        })
      ])
    ]
  }
}