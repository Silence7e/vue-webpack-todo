import createApp from './create-app';


export default context => new Promise((resolve, reject) => {
  const { app, router, store } = createApp();

  if (context.user) {
    store.state.user = context.user;
  }
  router.push(context.url);

  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject(new Error('no component matched'));
    }
    Promise.all(matchedComponents.map((Component) => {
      if (Component.asyncData) {
        return Component.asyncData({
          route: router.currentRoute,
          router,
          store,
        });
      }
      return null;
    })).then(() => {
      context.meta = app.$meta();
      context.state = store.state;
      context.router = router;
      return resolve(app);
    });
    return null;
  });
});
