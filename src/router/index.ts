import store from '@/store'
import { Dialog } from 'vant'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
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
        meta: { requiresAuth: false, title: '爱上VIP' }
      },
      /* 九块九 */
      {
        path: '/nine',
        name: 'nine',
        component: () => import('@/views/nine/nine.vue'),
        meta: { requiresAuth: false, title: '9.9包邮' }
      },
      /* 分类 */
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/menu.vue'),
        meta: { requiresAuth: false, title: '商品分类' }
      },
      /* 收藏 */
      {
        path: '/collection',
        name: 'collection',
        component: () => import('@/views/collection/collection.vue'),
        meta: { requiresAuth: true, title: '商品收藏' }
      },
      /* 我的 */
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/my.vue'),
        meta: { requiresAuth: false, title: '个人中心' }
      }
    ]
  },
  /* 商品详情页 */
  {
    path: '/goods/:goodsId/:id',
    name: 'Goods',
    component: () => import('@/views/goods/goods.vue'),
    meta: { requiresAuth: false, title: '商品详情' }
  }
]

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from) => {
  document.title = to.meta.title
})
export default router
