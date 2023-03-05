import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@renderer/pages/Home.vue'),
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@renderer/pages/Index.vue')
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@renderer/pages/VideoList.vue')
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@renderer/pages/Setting.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@renderer/pages/About.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
