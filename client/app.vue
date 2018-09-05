<template>
  <div id="app">
    <div id="cover" />
    {{ fullName }}{{ count }}
    <Header/>
    <!-- <todo/> -->
    <router-link :to="{name: 'app'}">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer/>
    <p>{{ textA }}</p>
    <p>{{ textB }}</p>
    <p>{{ textPlus }}</p>
    <!-- <router-view name="a" /> -->
  </div>
</template>

<script>
import {
  mapState, mapGetters, mapActions, mapMutations,
} from 'vuex';
import Header from './layout/header.vue';
import Footer from './layout/footer.jsx';

export default {
  // 声明引入的组件
  components: {
    Header,
    Footer,
  },
  computed: {
    textB() {
      return this.$store.state.b.text;
    },
    // ...mapState(['count']),
    ...mapState({
      count: state => state.count,
      textA: state => state.a.text,
    }),
    // count() {
    //   return this.$store.state.count;
    // },
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'a/textPlus',
    }),
    // fullName() {
    //   return this.$store.getters.fullName;
    // },
  },
  mounted() {
    setTimeout(() => {
      this.updateCount({ num: 1 });
    }, 1000);
    this.updateCountASync({ num: 2, time: 1000 });
    this['a/updateText']('123');
  },
  methods: {
    ...mapActions(['updateCountASync']),
    ...mapMutations(['updateCount', 'a/updateText']),
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
</style>
