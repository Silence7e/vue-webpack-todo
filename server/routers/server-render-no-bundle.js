const ejs = require('ejs');
const chalk = require('chalk');

module.exports = async (ctx, renderer, template, bundle) => {
  ctx.headers['Content-Type'] = 'text/html';

  const context = { url: ctx.path, user: ctx.session.user };
  try {
    const app = await bundle(context);

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath);
    }

    const appString = await renderer.renderToString(app, context);
    // const appString = await renderer.renderToString(context);


    const { title } = context.meta.inject();

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      title: title.text(),
      initialState: context.renderState(),
    });

    ctx.body = html;
  } catch (e) {
    console.log(chalk.red('render error'), e);
    throw e;
  }
  return null;
};
