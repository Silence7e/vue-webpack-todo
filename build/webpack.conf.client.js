/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const VueClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = require('./webpack.conf.base');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
  // 判断环境，vue框架一定要用
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"',
    },
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html'),
  }),
  new VueLoaderPlugin(),
  new VueClientPlugin(),
];
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    // 错误显示在网页上
    errors: true,
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333',
  },
  hot: true, // 热更新，只重新渲染该页面的组件
  historyApiFallback: {
    index: '/public/index.html',
  },
};

let config;

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            'stylus-loader',
          ],
        },
      ],
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(), // 配合hot使用
    ]),
  });
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: true,
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            'stylus-loader',
          ],
        },
      ],
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',
      }),
    ]),
  });
}
config.resolve = {
  alias: {
    model: path.join(__dirname, '../client/model/client-model.js'),
  },
};

module.exports = config;
