export default {
  updateCountASync(store, { num, time }) {
    setTimeout(() => {
      store.commit('updateCount', { num });
    }, time);
  },
};
