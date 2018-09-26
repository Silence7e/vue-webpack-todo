import Vuex from 'vuex';
import defaultState from './state/state';
import mutations from './mutations/mutations';
import getters from './getters/getters';
import actions from './actions/actions';

const isDev = process.env.NODE_ENV === 'development';
export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions,
    plugins: [
      (store) => {  //eslint-disable-line
        console.log('plugin invoked', store);
      },
    ],
    modules: {
      a: {
        namespaced: true,
        state: {
          text: 1,
        },
        mutations: {
          updateText(state, text) {
            console.log(state, text);
            state.text = text;
          },
        },
        getters: {
          textPlus(state, allGetters, rootState) {
            return state.text + rootState.count;
          },
        },
        actions: {
          add({ state, commit, rootState }, ...rest) {
            console.log('a/add:', rest);
            commit('updateText', state.text + rootState.count);
          },
        },
      },
      b: {
        namespaced: true,
        state: {
          text: 2,
        },
        actions: {
          testAction({ dispatch, commit }) {
            dispatch('a/add', 'test text', { root: true });
            commit('a/updateText', 'test text', { root: true });
          },
        },
      },
    },
  });
  if (module.hot) {
    module.hot.accept(
      [
        './state/state',
        './mutations/mutations',
        './actions/actions',
        './getters/getters',
      ],
      () => {
        const newState = require('./state/state').default;
        const newMutations = require('./mutations/mutations').default;
        const newActions = require('./actions/actions').default;
        const newGetters = require('./getters/getters').default;
        store.hotUpdate({
          state: newState,
          mutations: newMutations,
          actions: newActions,
          getters: newGetters,
        });
      },
    );
  }
  return store;
};
