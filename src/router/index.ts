import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/home/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/layout.vue'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: { requiresAuth: false }
      },
      /* 九块九 */
      {
        path: '/nine',
        name: 'nine',
        component: () => import('@/views/nine/nine.vue'),
        meta: { requiresAuth: false }
      },
      /* 分类 */
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/menu.vue'),
        meta: { requiresAuth: false }
      },
      /* 收藏 */
      {
        path: '/collection',
        name: 'collection',
        component: () => import('@/views/collection/collection.vue'),
        meta: { requiresAuth: true }
      },
      /* 我的 */
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/my.vue'),
        meta: { requiresAuth: false }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
