<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs
        :value="filter"
        @change="handleChangeTab">
        <tab
          v-for="tab in states"
          :key="tab"
          :label="tab"
          :index="tab" />
          <!-- <tab
          label="tab1"
          index="1">
          <span>tab Content 1</span>
        </tab>
        <tab index="2">
          <span
            slot="label"
            style="color:red;">tab2</span>
          <span>tab Content 2</span>
        </tab>
        <tab
          label="tab3"
          index="3">
          <span>tab Content 3</span>
        </tab> -->
      </tabs>
    </div>
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      @keyup.enter="handleAdd"
    >
    <item
      v-for="todo in filteredTodos"
      :todo="todo"
      :key="todo.id"
      @del="deleteTodo"
      @toggle="toggleTodoState"
    />
    <helper
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted ="clearAllCompleted"
    />
    <!-- <router-view /> -->
  </section>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Item from './item.vue';
import Helper from './helper.vue';

export default {
  metaInfo: {
    title: 'Todo App',
  },
  beforeRouteEnter(to, from, next) {
    console.log('todo before enter');
    next(vm => console.log(`id is ${vm.id}`));
  },
  beforeRouteUpdata(to, from, next) {
    console.log('todo before update');
    next();
  },
  beforeRouteLeave(to, from, next) {
    // console.log('todo before leave');
    // if (global.confirm('are you sure')) {
    //   next();
    // }
    next();
  },
  components: {
    Item,
    Helper,
  },
  props: {
    id: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      filter: 'all',
      states: ['all', 'active', 'completed'],
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos;
      }
      const completed = this.filter === 'completed';
      return this.todos.filter(todo => completed === todo.completed);
    },
    ...mapState(['todos']),
  },
  mounted() {
    if (!this.todos || this.todos.length === 0) {
      this.fetchTodos();
    }
  },
  asyncData({ store, router }) {
    if (store.state.user) {
      return store.dispatch('fetchTodos');
    }
    router.replace('/login');
    return Promise.resolve();
  },
  methods: {
    ...mapActions([
      'fetchTodos',
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'deleteAllCompleted',
    ]),
    handleAdd(e) {
      const content = e.target.value.trim();
      if (!content) {
        this.$notify({
          content: '请输入内容',
        });
        return;
      }
      const todo = {
        content,
        completed: false,
      };
      this.addTodo(todo);
      e.target.value = '';
    },
    toggleTodoState(todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed,
        }),
      });
    },
    toggleFilter(state) {
      this.filter = state;
    },
    clearAllCompleted() {
      this.deleteAllCompleted();
    },
    handleChangeTab(value) {
      this.filter = value;
    },
  },
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0px auto;
  box-shadow: 0px 0px 5px #666;
}

.add-input {
  positon: relative;
  margin: 0px;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4rem;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0px rgba(0, 0, 0, 0);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
}

.tab-container {
  background: #fff;
  padding: 0 15px;
}
</style>
