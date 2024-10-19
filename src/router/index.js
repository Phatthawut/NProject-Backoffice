import { createRouter, createWebHistory } from 'vue-router'

import AdminDashboard from '@/views/admin/Dashboard.vue'
import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'
import AdminUserList from '@/views/admin/user/ListView.vue'
import AdminUserUpdate from '@/views/admin/user/UpdateView.vue'
import AdminOrderList from '@/views/admin/order/ListView.vue'
import AdminOrderUpdate from '@/views/admin/order/DetailView.vue'

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
      name: 'admin-products-list',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name: 'admin-products-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/update/:id',
      name: 'admin-products-update',
      component: AdminProductUpdate
    },
    {
      path: '/admin/users',
      name: 'admin-users-list',
      component: AdminUserList
    },
    {
      path: '/admin/users/update/:id',
      name: 'admin-users-update',
      component: AdminUserUpdate
    },{
      path: '/admin/orders',
      name: 'admin-orders-list',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/detail/:id',
      name: 'admin-orders-detail',
      component: AdminOrderUpdate
    }
  ]
})

export default router
