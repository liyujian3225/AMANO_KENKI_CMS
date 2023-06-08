import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login'),
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import(/* webpackChunkName: "about" */ '../views/layout'),
  },
]

const router = new VueRouter({
  routes
})

export default router
