import Vue from 'vue';

const app = new Vue({
  data: {
    text: 1,
  },
  beforeCreate() {
    // $el  undefined,
    console.log(this.$el, 'beforeCreate');
  },
  created() {
    // $el  undefined,
    console.log(this.$el, 'created');
  },
  beforeMount() {
    console.log(this.$el, 'beforeMount');
  },
  mounted() {
    console.log(this.$el, 'mounted');
  },
  beforeUpdate() {
    console.log(this, 'beforeUpdate');
  },
  updated() {
    console.log(this, 'updated');
  },
  activated() {
    console.log(this, 'activated');
  },
  deactivated() {
    console.log(this, 'deactivated');
  },
  beforeDestroy() {
    console.log(this, 'beforeDestroy');
  },
  destroyed() {
    console.log(this, 'destroyed');
  },
  template: '<div>{{text}}</div>',
  render(h) {
    return h('div', {}, this.text);
  },
  renderError(h, err) {
    return h('div', {}, err.stack);
    // 开发时会被调用
    // 作用域：本组件
  },
  errorCaptured() {
    // 会冒泡，生产环境可以使用
  },
});
app.$mount('#root');

// setInterval(() => {
//   app.text += 1;
// }, 5000);

// setTimeout(() => {
//   app.$destroy();
// }, 1000);
