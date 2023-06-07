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
    path: '/homePage',
    name: 'homePage',
    component: () => import(/* webpackChunkName: "about" */ '../views/homePage'),
  },
]

const router = new VueRouter({
  routes
})

export default router
