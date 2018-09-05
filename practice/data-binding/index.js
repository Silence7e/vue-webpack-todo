import Vue from 'vue';

new Vue({
  el: '#root',
  data: {
    aaa: 'main',
    isActive: true,
    html: '<span>123</span>',
  },
  methods: {
    handleClick() {
      console.log('clicked!');
    },
  },
  comptured: {
    classNames() {},
  },
  template: `
  <div :id="aaa" @click="handleClick">
  {{Date.now()}}
  {{isActive?'active':'not active'}}
  {{html}}
  <p v-html="html"></p>
  <div :class="{active: isActive}">class1</div>
  <div :class="[isActive ?'active':'']">class2</div>
  <div :class="[{active:isActive}]">class3</div>
  </div>
  `,
});
