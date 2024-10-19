<script setup>
import { RouterLink } from 'vue-router'

import { useAdminOrderStore } from '@/stores/admin/order'

import AdminLayout from '@/layouts/AdminLayout.vue'

import HeaderTable from '@/components/HeaderTable.vue'

const adminOrderStore = useAdminOrderStore()
</script>

<template>
    <AdminLayout>
        <div class="flex justify-between items-center py-4">
            <div class="text-3xl font-bold py-4">Order</div>
        </div>
        <HeaderTable :headers="['Customer Name', 'Price', 'Status', 'Update At', 'Action']">
            <tr v-for="(order, index) in adminOrderStore.list">
                <td>{{ order.customerName }}</td>
                <td>{{ order.totalPrice }}</td>
                <td>{{ order.status }}</td>
                <td>{{ order.updatedAt }}</td>
                <td>
                    <RouterLink :to="{ name: 'admin-orders-detail', params: { id: index } }" class="btn btn-neutral">See
                        Detail
                    </RouterLink>
                </td>
            </tr>
        </HeaderTable>
    </AdminLayout>
</template>