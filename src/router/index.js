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
    component: () => import(/* webpackChunkName: "login" */ '../views/login'),
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import(/* webpackChunkName: "layout" */ '../views/layout'),
    children: [
      {
        path: '/boat',
        name: 'boat',
        component: () => import(/* webpackChunkName: "boat" */ '../views/productList'),
      },
      {
        path: '/engine',
        name: 'engine',
        component: () => import(/* webpackChunkName: "engine" */ '../views/productList'),
      },
      {
        path: '/buildMachine',
        name: 'buildMachine',
        component: () => import(/* webpackChunkName: "buildMachine" */ '../views/productList'),
      },
      {
        path: '/productAdd',
        name: 'productAdd',
        component: () => import(/* webpackChunkName: "buildMachine" */ '../views/productAdd'),
      },
      {
        path: '/factoryLogin',
        name: 'factoryLogin',
        component: () => import(/* webpackChunkName: "factoryLogin" */ '../views/factoryLogin'),
      },
      {
        path: '/changePassword',
        name: 'changePassword',
        component: () => import(/* webpackChunkName: "changePassword" */ '../views/changePassword'),
      },
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
