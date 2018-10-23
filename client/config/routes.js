// import Todo from '../views/todo/todo.vue';
// import Login from '../views/login/login.vue';

export default [
  {
    path: '/',
    redirect: '/app',
  },
  {
    // path: '/app/:id',
    path: '/app',
    // props: true, // 将params 变成props 传入组件 解耦
    // components: {
    //   default: Todo, // 多个router-view 模式
    //   a: Login,
    // },
    component: () => import(/* webpackChunkName: "todo-vue" */ '../views/todo/todo.vue'),
    // component: Todo,
    name: 'app', // 跳转的时候用
    meta: {
      title: 'this is app',
      description: 'description',
    },
    // beforeEnter(to, from, next) {
    //   console.log(to, from); // 进入路由之前才会被调用
    //   next();
    // },
    // children: [
    //   {
    //     path: 'test',
    //     component: Login,
    //   },
    // ],
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login-vue" */ '../views/login/login.vue'),
    // component: Login,
  },
];
