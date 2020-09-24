import Vue from 'vue'
import Router from 'vue-router'
import QARouter from "../QA/QARouter"
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: function (resolve) {
        require(['../components/HelloWorld'], resolve)
      },
    },
    {
      path: '/login',
      name: 'login',
      component: function (resolve) {
        require(['../view/login'], resolve)
      },
    },
    ...QARouter,
    { path: "*", redirect: '/' },
  ],
  scrollBehavior: () => ({ x: 0, y: 0 }),
})
