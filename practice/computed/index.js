import Vue from 'vue';

new Vue({
  el: '#root',
  data: {
    firstName: 'robin',
    lastName: 'lee',
  },
  computed: {
    name: {
      get() {
        return `${this.firstName}   ${this.lastName}`;
      },
      set(name) {
        const names = name.split(' ');
        [this.firstName, this.lastName] = names;
      },
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
