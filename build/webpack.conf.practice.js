/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.conf.base');

const defaultPlugins = [
  // 判断环境，vue框架一定要用
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"',
    },
  }),
  new HTMLPlugin({
    template: path.resolve(__dirname, 'template.html'),
  }),
  new VueLoaderPlugin(),
];
const devServer = {
  port: 8080,
  host: '0.0.0.0',
  overlay: {
    // 错误显示在网页上
    errors: true,
  },
  hot: true, // 热更新，只重新渲染该页面的组件
};

const config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
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
  resolve: {
    alias: {
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js'),
    },
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(), // 配合hot使用
  ]),
});

module.exports = config;
