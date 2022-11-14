import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  // {
  //   name: 'NotFoundError',
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/views/errors/Notfound/index.vue'),
  // }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: routes,
})

export default router
