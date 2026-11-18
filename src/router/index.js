import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { homeByRole } from '@/utils/role'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: AuthLayout, children: [{ path: '', component: LoginView }] },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { roles: ['pemilik'] } },
        { path: 'menu', component: () => import('@/views/MenuView.vue'), meta: { roles: ['pemilik', 'pelayan'] } },
        { path: 'order', component: () => import('@/views/OrderView.vue'), meta: { roles: ['pelayan'] } },
        { path: 'purchase', component: () => import('@/views/PurchaseView.vue'), meta: { roles: ['pemilik'] } },
        { path: 'report', component: () => import('@/views/ReportView.vue'), meta: { roles: ['pemilik'] } },
        { path: 'catalog', component: () => import('@/views/CatalogView.vue'), meta: { roles: ['pelanggan'] } },
        { path: 'check-order', component: () => import('@/views/CheckOrderView.vue'), meta: { roles: ['pelanggan'] } },
        { path: 'forbidden', component: () => import('@/views/ForbiddenView.vue') }
      ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.path === '/login') return auth.user ? homeByRole(auth.user.role) : true
  if (to.meta.requiresAuth && !auth.user) return '/login'
  if (to.path === '/') return homeByRole(auth.user.role)
  if (to.meta.roles && !to.meta.roles.includes(auth.user.role)) return '/forbidden'
})

export default router