import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

export const asyncRoutes = [
  
]

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Home
  },{
    path: '/login',
    name: 'Login',
    component: () => import('../views/user/login.vue')
  },{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    name: 'notebook',
    path: '/note',
    component: () => import('../views/notebook/index.vue'),
    children: [
      {
        path: '',
        name: 'noteHome',
        component: () => import('@/views/notebook/components/home.vue')
      },
      {
        path: 'set/:type',
        name: 'set',
        component: () => import('@/views/notebook/components/set.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
