import Vue from 'vue';

new Vue({
  el: '#root',
  data: {
    text: 0,
    active: false,
    html: '<span>this is html</span>',
    arr: [1, 2, 3],
    picked: 1,
    obj: {
      a: '123',
      b: '456',
      c: '789',
    },
  },
  template: `
  <div>
    <div v-once>{{text}}</div>
    <div v-pre>{{text}}</div>
    <div v-text="text"></div>
    <div v-html="html"></div>
    <div v-show="!active">show</div>
    <div v-if="active">if</div>
    <div v-else>else</div>
    <input type="text" v-model.number.lazy="text">
    <div>
      <input type="checkbox" :value="1" v-model="arr">
      <input type="checkbox" :value="2" v-model="arr">
      <input type="checkbox" :value="3" v-model="arr">
    </div>
    <div>
    <input type="radio" :value="1" v-model="picked">
    <input type="radio" :value="2" v-model="picked">
    <input type="radio" :value="3" v-model="picked">
    </div>
    <ul>
      <li v-for="(item, index) in arr" :key="item">{{item}}-{{index}}</li>
    </ul>
    <ul>
      <li v-for="(value, key, index) in obj" :key="key">{{value}}-{{key}}-{{index}}</li>
    </ul>
    </div>
  `,
});
