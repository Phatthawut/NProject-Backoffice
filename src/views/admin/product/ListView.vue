<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router';

import { useAdminProductStore } from '@/stores/admin/product'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Edit from '@/components/icons/Edit.vue'
import Trash from '@/components/icons/Trash.vue'
import HeaderTable from '@/components/HeaderTable.vue'

const adminProductStore = useAdminProductStore()
onMounted(() => {
    adminProductStore.loadProducts()
})

const removeProduct = (index) => {
    adminProductStore.removeProduct(index)
}
</script>

<template>
    <AdminLayout>
        <div class="flex justify-between items-center py-4">
            <div class="text-3xl font-bold py-4">Product</div>
            <div>
                <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-neutral">Add New</RouterLink>
            </div>
        </div>
        <HeaderTable :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'Update At', 'Action']">
            <tr v-for="(product, index) in adminProductStore.list">
                <th>{{ product.name }}</th>
                <td><img :src="product.imageUrl" :alt="product.name" class="w-12 h-12"></td>
                <td>{{ product.price }}</td>
                <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                <td>
                    <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-warning'">{{
                        product.status }}</div>
                </td>
                <td>{{ product.updateAt }}</td>
                <td>
                    <div class="flex items-center gap-1">
                        <RouterLink :to="{ name: 'admin-products-update', params: { id: index } }"
                            class="btn btn-ghost">
                            <Edit class="w-4 h-4"></Edit>
                        </RouterLink>
                        <div @click="removeProduct(index)" class="btn btn-ghost">
                            <Trash class="w-4 h-4"></Trash>
                        </div>
                    </div>
                </td>
            </tr>
        </HeaderTable>
    </AdminLayout>
</template>