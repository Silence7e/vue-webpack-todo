import Router from 'vue-router';
import routes from './routes';

export default () => new Router({
  routes,
  mode: 'history',
  // base: '/base',
  linkActiveClass: 'active-link',
  fallback: true,
  linkExactActiveClass: 'exact-active-link',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
  // parseQuery(query) {},
  // stringifyQuery(obj) {},
});
