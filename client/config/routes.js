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
    props: true,
    // components: {
    //   default: Todo,
    //   a: Login,
    // },
    component: () => import('../views/todo/todo.vue'),
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'description',
    },
    beforeEnter(to, from, next) {
      console.log(to, from);
      next();
    },
    // children: [
    //   {
    //     path: 'test',
    //     component: Login,
    //   },
    // ],
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue'),
  },
];
