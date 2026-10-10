import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('@/pages/Home.vue'), meta: { enter: 'home' } },
  { path: '/memories', name: 'memories', component: () => import('@/pages/Memories.vue'), meta: { enter: 'memories' } },
  { path: '/studio', name: 'studio', component: () => import('@/pages/Studio.vue'), meta: { enter: 'studio' } },
  { path: '/letter', name: 'letter', component: () => import('@/pages/Letter.vue'), meta: { enter: 'letter' } },
  { path: '/birthday', name: 'birthday', component: () => import('@/pages/Birthday.vue'), meta: { enter: 'birthday' } },
  { path: '/:path(.*)*', name: 'notFound', component: () => import('@/pages/NotFound.vue') },
]

export default routes
