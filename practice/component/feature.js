import Vue from 'vue';

const ChildCompnonent = {
  inject: ['gp', 'data'],
  mounted() {
    // console.log(this.$parent.$options.name);
    console.log(this.gp);
  },
  template: '<div>child Component:{{data.value}}</div>',
};

const component = {
  name: 'comp',
  components: {
    ChildCompnonent,
  },
  data() {
    return {
      value: 'scoped-slot',
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa',
      },
    };
  },
  template: `
  <div :style="style">
    <child-compnonent />
    <slot :value="value" aaa="1"></slot>
  </div>
  `,
};

new Vue({
  el: '#root',
  components: {
    CompOne: component,
  },
  provide() {
    const data = {};
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true,
    });
    return {
      gp: this,
      data,
    };
  },
  data() {
    return {
      text: 'app',
      value: '123',
    };
  },
  mounted() {
    console.log(this.$refs);
    console.log(this.$refs.comp.value);
  },
  template: `
  <div>
    <comp-one ref="comp">
      <span slot-scope="props" ref="span">this is {{props.value}} {{props.aaa}}</span>
    </comp-one>
    <input type="text" v-model="value">
  </div>
  `,
});
