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
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
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
  {
    name: 'user',
    path: '/user',
    component: () => import('@/views/user/index.vue'),
    children: [
      {
        path: 'setting',
        name: 'editSetting',
        component: () => import('@/views/user/components/setting.vue'),
        meta: {
          requireLogin: true
        }
      },
      {
        path: ':data',
        name: 'userPage',
        component: () => import('@/views/user/components/home.vue')
      },
      {
        path: 'login',
        name: 'userLogin',
        component: () => import('@/views/user/components/login.vue')
      },
      {
        path: 'register',
        name: 'userRegister',
        component: () => import('@/views/user/components/register.vue')
      }
    ]
  },
  {
    path: '/problem',
    name: 'problem',
    component: () => import('@/views/problem/index.vue'),
    children: [
      {
        path: '',
        name: 'problemHomePage',
        component: () => import('@/views/problem/components/home.vue')
      },
      {
        path: 'set/:type',
        name: 'problemSet',
        component: () => import('@/views/problem/components/set.vue')
      },
      {
        path: ':id',
        name: 'problemInfo',
        component: () => import('@/views/problem/components/info.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
