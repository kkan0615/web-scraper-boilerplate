import { RouteRecordRaw } from 'vue-router'
import Layout from '@/views/settings/Layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    name: 'Setting',
    path: '/settings',
    component: Layout,
    redirect: { name: 'SettingGeneral' },
    children: [
      {
        name: 'SettingGeneral',
        path: 'general',
        component: () => import('@/views/settings/General/index.vue'),
      },
      {
        name: 'SettingScrapping',
        path: 'scrapping',
        component: () => import('@/views/settings/Scrapping/index.vue'),
      },
      {
        name: 'SettingVersion',
        path: 'version',
        component: () => import('@/views/settings/Version/index.vue'),
      },
    ]
  },
]

export default routes
