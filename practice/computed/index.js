import Vue from 'vue';

new Vue({
  el: '#root',
  data: {
    firstName: 'robin',
    lastName: 'lee',
  },
  computed: {
    name() {
      return `${this.firstName}   ${this.lastName}`;
    },
  },
  watch: {
    firstName(newName, oldName) {
      console.log(newName, oldName);
      this.lastName = oldName;
    },
  },
  template: `
  <div>
  <input v-model="firstName">
  {{name}}
  </div>`,
});
