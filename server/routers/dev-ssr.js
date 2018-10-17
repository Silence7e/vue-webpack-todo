/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const Router = require('koa-router');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');
const chalk = require('chalk');
const serverConfig = require('../../build/webpack.conf.server');
const serverRender = require('./server-render');

const serverCompiler = webpack(serverConfig);

const mfs = new MemoryFS();


serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (e, stats) => {
  if (e) {
    throw (e);
  }
  stats = stats.toJson();
  stats.errors.forEach(err => console.log(chalk.err(err)));
  stats.warnings.forEach(warn => console.warn(chalk.yellow(warn)));
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json',
  );
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
  console.info('new bundle generated');
});

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'wait';
    return;
  }
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8');

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json',
  );
  if (!clientManifestResp) {
    // console.error('axios 调用出错了');
  }
  const clientManifest = clientManifestResp.data;
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest,
  });
  await serverRender(ctx, renderer, template);
};


const router = new Router();

router.get('*', handleSSR);

module.exports = router;
