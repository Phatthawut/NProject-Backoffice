import { createRouter, createWebHistory } from 'vue-router'

import AdminDashboard from '@/views/admin/Dashboard.vue'
import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/products',
      name: 'admin-product-list',
      component: AdminProductList
    }
    {
      path: '/admin/products/create',
      name: 'admin-product-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/update/:id',
      name: 'admin-product-update',
      component: AdminProductUpdate
    }
  ]
})

export default router
