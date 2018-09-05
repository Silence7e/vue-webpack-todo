import Vue from 'vue';

const component = {
  name: 'comp',
  props: ['props1'],
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
  // template: `
  // <div :style="style">
  //   <slot></slot>
  // </div>
  // `,
  render(createElement) {
    return createElement(
      'div',
      {
        style: this.style,
        // on: {
        //   click: () => this.$emit('click'),
        // },
      },
      [this.$slots.header, this.props1],
    );
  },
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
  methods: {
    handleClick() {
      console.log('clicked!');
    },
  },
  template: `
    <comp-one ref="comp">
      <span>this is {{value}} </span>
    </comp-one>
  `,
  render(createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        props: {
          props1: this.value,
        },
        // on: {
        //   click: this.handleClick,
        // },
        nativeOn: {
          click: this.handleClick,
        },
      },
      [
        createElement(
          'span',
          {
            ref: 'span',
            slot: 'header',
            domProps: {
              innerHTML: '<span>456</span>',
            },
          },
          this.value,
        ),
      ],
    );
  },
});
