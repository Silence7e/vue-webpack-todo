const Router = require('koa-router');

const userRouter = new Router({ prefix: '/user' });

userRouter.post('/login', async (ctx) => {
  const user = ctx.request.body;
  if (user.username === 'robin' && user.password === 'robin123456') {
    ctx.session.user = {
      username: 'robin',
    };
    ctx.body = {
      success: true,
      data: {
        username: 'robin',
      },
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: 'password error',
    };
  }
});


module.exports = userRouter;
