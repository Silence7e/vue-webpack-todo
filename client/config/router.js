import Router from 'vue-router';
import routes from './routes';

export default () => new Router({
  routes,
  mode: 'history',
  // base: '/base', // 基路径
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  fallback: true, // 浏览器不支持history时，降级为hash模式。
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
