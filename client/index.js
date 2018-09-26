import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

import './assets/styles/global.styl';
import createRouter from './config/router';
import createStore from './store/store';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = createRouter();
const store = createStore();

store.registerModule('c', {
  state: {
    text: 'textC=3',
  },
});

// store.watch(state => state.count + 1, (newCount) => {
//   console.log('new count watched: ', newCount);
// });

store.subscribe((mutation, state) => {
  console.log(mutation.type);
  console.log(mutation.payload);
  console.log(state);
});

store.subscribeAction((action, state) => {
  console.log('subscribeAction', action.type, action.payload, state);
});

router.beforeEach((to, from, next) => {
  console.log('beforeEach');
  // if (to.fullPath !== '/login') {
  //   next('/login');
  //   // next({ path: '/login', replace: true });
  //   return;
  // }
  next();
});

router.beforeResolve((to, from, next) => {
  console.log('beforeResolve');
  next();
});

router.afterEach((to, from) => {
  console.log('afterEach', to, from);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#root');
