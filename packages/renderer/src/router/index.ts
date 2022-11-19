import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home/index.vue'
import settingRoutes from './routes/setting'

const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  ...settingRoutes
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
