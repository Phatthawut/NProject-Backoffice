<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useAdminProductStore } from '@/stores/admin/product'
import AdminLayout from '@/layouts/AdminLayout.vue'

const formData = [
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Image',
        field: 'imageUrl'
    },
    {
        name: 'Price',
        field: 'price'
    },
    {
        name: 'Quantity',
        field: 'quantity'
    },
    {
        name: 'About',
        field: 'about'
    }
]

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()

const productIndex = ref(-1)
const mode = ref('ADD')

const productData = reactive({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: 'open'
})

const updateProduct = () => {
    if (mode.value === 'EDIT') {
        adminProductStore.updateProduct(productIndex.value, productData)
    } else {
        adminProductStore.addProduct(productData)
    }
    router.push({ name: 'admin-products-list' })
}

const goBack = () => {
    router.push({ name: 'admin-products-list' })
}

onMounted(() => {
    if (route.params.id) {
        productIndex.value = parseInt(route.params.id)
        mode.value = 'EDIT'

        const selectedProduct = adminProductStore.getProduct(productIndex.value)
        console.log('selectedProduct', selectedProduct)
        if (selectedProduct) {
            productData.name = selectedProduct.name
            productData.imageUrl = selectedProduct.imageUrl
            productData.price = selectedProduct.price
            productData.quantity = selectedProduct.quantity
            productData.about = selectedProduct.about
            productData.status = selectedProduct.status || 'open'
        }
    }
})
</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8">
            <div class="text-xl font-bold">{{ mode }} Product</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <label v-for="form in formData" class="form-control w-full">
                    <div class="label">
                        <span class="label-text font-bold">{{ form.name }}</span>
                    </div>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full"
                        v-model="productData[form.field]" />
                </label>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text font-bold">Status</span>
                    </div>
                    <select v-model="productData.status" class="select select-bordered">
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                    </select>
                </label>
            </div>
            <div class="flex justify-end pt-4 gap-2">
                <button class="btn btn-ghost" @click="goBack">Back</button>
                <button class="btn btn-neutral" @click="updateProduct">{{ mode }}</button>
            </div>
        </div>
    </AdminLayout>
</template>