import Vue from 'vue';

const component = {
  model: {
    prop: 'value1',
    event: 'change',
  },
  props: ['value', 'value1'],
  methods: {
    handleInput(e) {
      this.$emit('change', e.target.value);
    },
  },
  template: `
  <div>
    <input type="text" :value="value" @input="handleInput">
  </div>
  `,
};

new Vue({
  el: '#root',
  components: {
    CompOne: component,
  },
  data() {
    return {
      value: '123',
    };
  },
  template: `
  <div>
    <comp-one :value="value" @input="value=arguments[0]"></comp-one>
    <comp-one v-model="value"></comp-one>
  </div>
  `,
});
