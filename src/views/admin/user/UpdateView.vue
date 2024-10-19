<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { useEventStore } from '@/stores/event'
import { useAdminUserStore } from '@/stores/admin/user'

import AdminLayout from '@/layouts/AdminLayout.vue'

const formData = [
    {
        name: 'Name',
        field: 'name',
        type: 'text'
    },
    {
        name: 'Role',
        field: 'role',
        type: 'select',
        dropdownList: ['admin', 'moderator', 'user']
    },
    {
        name: 'Status',
        field: 'status',
        type: 'select',
        dropdownList: ['active', 'inactive']
    }
]

const route = useRoute()
const router = useRouter()

const eventStore = useEventStore()
const adminUserStore = useAdminUserStore()

const userIndex = ref(-1)

const userData = reactive({
    name: '',
    role: '',
    status: ''
})

onMounted(() => {
    if (route.params.id) {
        userIndex.value = parseInt(route.params.id)
        const selectedUser = adminUserStore.getUser(userIndex.value)
        if (selectedUser) {
            userData.name = selectedUser.name
            userData.role = selectedUser.role
            userData.status = selectedUser.status
        }
    }
})

const goBack = () => {
    router.push({ name: 'admin-users-list' })
}
const updateUser = () => {
    adminUserStore.updateUser(userIndex.value, userData)
    eventStore.popupMessage('info', 'Update User Successful!.')
    router.push({ name: 'admin-users-list' })
}
</script>

<template>
    <AdminLayout>
        <div class="shadow-xl p-8">
            <div class="text-xl font-bold">Update User</div>
            <div class="divider"></div>
            <div class="grid grid-cols-1 gap-2">
                <label v-for="form in formData" class="form-control w-full">
                    <div class="label">
                        <span class="label-text font-bold">{{ form.name }}</span>
                    </div>
                    <input v-if="form.type === 'text'" v-model="userData[form.field]" type="text"
                        placeholder="Type here" class="input input-bordered w-full" />
                    <select v-if="form.type === 'select'" v-model="userData[form.field]"
                        class="select select-bordered w-full">
                        <option v-for="item in form.dropdownList">{{ item }}</option>
                    </select>
                </label>
            </div>
            <div class="flex justify-end pt-4 gap-2">
                <button class="btn btn-ghost" @click="goBack">Back</button>
                <button class="btn btn-neutral" @click="updateUser">Update</button>
            </div>
        </div>
    </AdminLayout>
</template>