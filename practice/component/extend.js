import Vue from 'vue';

const component = {
  props: {
    active: Boolean,
    propOne: String,
  },
  methods: {
    hancleChange() {
      console.log('handleChange');
      this.$emit('change');
    },
  },
  template: `<div>
  this is component {{text}}
  <input v-model="text" @change="hancleChange">
  <span>{{propOne}}</span>
  </div>`,
  data() {
    return {
      text: 1,
    };
  },
};

const CompVue = Vue.extend(component);

new CompVue({
  el: '#root',
  propsData: {
    propOne: 'propOne',
  },
});
