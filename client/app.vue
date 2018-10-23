<template>
  <div id="app">
    <div id="cover" />
    <div
      v-show="loading"
      id="loading">
      <loading />
    </div>
    <!-- {{ fullName }}{{ count }} -->
    <Header/>
    <!-- <todo/> -->
    <!-- <router-link to="/app">app</router-link>
    <router-link to="/login">login</router-link> -->
    <transition
      name="fade"
      mode="out-in">
      <router-view />
    </transition>
    <!-- <button @click="notify">click</button> -->
    <!-- <notification content="test notify" /> -->
    <Footer/>
    <!-- <p>{{ textA }}</p>
    <p>{{ textB }}</p> -->
    <!-- <p>{{ textC }}</p>
    <p>{{ textPlus }}</p> -->
    <!-- <router-view name="a" /> -->
  </div>
</template>

<script>
import {
  mapState,
} from 'vuex';
import Header from './layout/header.vue';
import Footer from './layout/footer.jsx';
import Loading from './components/loading/loading.vue';

export default {
  // 声明引入的组件
  components: {
    Header,
    Footer,
    Loading,
  },
  computed: {
    ...mapState(['loading']),
    // ...mapState({
    //   count: state => state.count,
    // }),
    // count() {
    //   return this.$store.state.count;
    // },
    // ...mapGetters({
    //   fullName: 'fullName',
    //   textPlus: 'a/textPlus',
    // }),
    // fullName() {
    //   return this.$store.getters.fullName;
    // },
  },
  mounted() {
    // setTimeout(() => {
    //   this.updateCount({ num: 1 });
    // }, 1000);
    // console.log(this.$route);
    // this.updateCountASync({ num: 2, time: 1000 });
    // this['a/updateText']('123');
    // this['b/testAction']('456');
  },
  methods: {
    // ...mapActions(['updateCountASync', 'b/testAction']),
    // ...mapMutations(['updateCount', 'a/updateText']),
    notify() {
      this.$notify({
        content: 'test $notify',
        btn: 'close',
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  #cover {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    opacity: 0.9;
    z-index: -1;
  }
}

#loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.3);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
