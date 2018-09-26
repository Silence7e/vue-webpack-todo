module.exports = isDev => ({
  preserveWhitespace: true,
  extractCSS: !isDev,
  cssModules: {
    localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
    camelCase: true,
  },
  // hotReload:false, //根据 process.env.NODE_ENV === 'production' 自动赋值
  loaders: {

  },
  preLoader: {

  },
});
