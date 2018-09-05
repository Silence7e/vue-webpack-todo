import Vue from 'vue';

// new Vue({
//   el: '#root',
//   template: '<div>2</div>',
// });

const app = new Vue({
  data() {
    return {
      text: 0,
      obj: {},
    };
  },
  watch: {
    text(newText, oldText) {
      console.log(newText, oldText);
    },
  },
  template: '<div ref="d"><p ref="p"></p>{{text}} {{obj.a}}</div>',
});

app.$mount('#root');

setTimeout(() => {
  app.text += 1;
  app.obj.a = Math.random();
}, 1000);

// console.log(app);
// console.log(app.$data);
// console.log(app.$props);
// console.log(app.$el);
// console.log(app.$options);
// app.$options.render = h => h('div', {}, 'new render function');

// console.log(app.$root === app);
// console.log(app.$children);

// 插槽
// console.log(app.$slots);
// console.log(app.$scopedSlots);

console.log(app.$refs);

// console.log(app.$isServer);

// 方法 watch

// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText},${oldText}`);
// });

// unWatch();

app.$on('test', (a, b) => {
  console.log('test is emitted', a, b);
});

app.$emit('test', 1, 2);

app.$once('test', () => {
  console.log('once');
});

app.$forceUpdate();
// $set时不需要forceUpdate
app.$set(app.obj, 'a', 1);
app.$delete(app.obj, 'a', 1);

// 下一次dom更新的时候
app.$nextTick(() => {
  console.log(app.text);
});
