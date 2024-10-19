<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { useAdminOrderStore } from '@/stores/admin/order'

import AdminLayout from '@/layouts/AdminLayout.vue'

import HeaderTable from '@/components/HeaderTable.vue'

const orderIndex = ref(-1)
const orderData = ref({
    products: []
})
const route = useRoute()
const adminOrderStore = useAdminOrderStore()

onMounted(() => {
    if (route.params.id) {
        orderIndex.value = parseInt(route.params.id)
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
        console.log(selectedOrder)
    }
})

</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8">
            <div class="text-xl font-bold">Order Detail id: {{ orderIndex }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <div class="font-bold">Order date</div>
                    <div>{{ orderData.updatedAt }}</div>
                </div>
                <div>
                    <div class="font-bold">Order number</div>
                    <div>{{ orderData.no }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Adress</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-1 gap-4">
                <div v-for="product in orderData.products">
                    <div class="grid grid-cols-3 justify-items-end items-center">
                        <div class="flex gap-2 items-center">
                            <div class="w-20"><img :src="product.imageUrl" :alt="product.name"></div>
                            <div class="flex flex-col">
                                <div class="font-bold">{{ product.name }}</div>
                                <div>{{ product.description }}
                                </div>
                            </div>
                        </div>
                        <div class="font-semibold">Quantity {{ product.quantity }} Pcs.</div>
                        <div class="font-semibold">{{ product.price }} ฿</div>
                    </div>
                </div>
                <div class="divider"></div>
            </div>
            <div class="flex justify-between font-bold">
                <div>Total Price</div>
                <div>{{ orderData.totalPrice }}</div>
            </div>
        </div>
        <div class="flex justify-end pt-4">
            <RouterLink :to="{ name: 'admin-orders-list' }" class="btn btn-neutral">Back
            </RouterLink>
        </div>
    </AdminLayout>
</template>