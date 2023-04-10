import { createRouter, createWebHistory } from 'vue-router'
import auth from './modules/auth'
import common from './modules/common'

const routes = [...auth, ...common]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 네비게이션 가드
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth) {
    // 로그인이 필요한 페이지에 로그인하지 않은 경우
    next('/login')
  } else {
    if (to.path === '/login') {
      next('/')
      return
    }
    next()
  }
})

export default router
