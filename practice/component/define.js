import Vue from 'vue';

const component = {
  props: {
    active: {
      type: Boolean,
      required: true,
      default: true,
      validator(value) {
        return typeof value === 'boolean';
      },
    },
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
  <span v-show="active">active</span>
  </div>`,
  data() {
    return {
      text: 1,
    };
  },
};

Vue.component('CompOne', component);

new Vue({
  el: '#root',
  components: {
    Comp: component,
  },
  data() {
    return {
      prop1: '1',
    };
  },
  methods: {
    handleChange() {
      console.log('outChange');
      this.prop1 += 1;
    },
  },
  template: `<div>
  123
  <comp-one :active="false" :prop-one="prop1" @change="handleChange"></comp-one>
  <comp :active="true" prop-one="text2"></comp>
  </div>`,
});
