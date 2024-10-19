<script setup>
import { RouterLink } from 'vue-router'

import AdminLayout from '@/layouts/AdminLayout.vue'

import { useAdminUserStore } from '@/stores/admin/user'

import Edit from '@/components/icons/Edit.vue'
import Ban from '@/components/icons/Ban.vue'
import HeaderTable from '@/components/HeaderTable.vue'

const adminUserStore = useAdminUserStore()

const changeStatus = (index) => {
    let selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'active' ? 'inactive' : 'active'
    adminUserStore.updateUser(selectedUser)
}
</script>

<template>
    <AdminLayout>
        <div class="flex justify-between items-center py-4">
            <div class="text-3xl font-bold py-4">User</div>
        </div>
        <HeaderTable :headers="['Name', 'Role', 'Status', 'Update At', 'Action']">
            <tr v-for="(user, index) in adminUserStore.list">
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <div class="badge" :class="user.status === 'active' ? 'badge-success' : 'badge-warning'">{{
                        user.status }}</div>
                </td>
                <td>{{ user.updateAt }}</td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'admin-users-update', params: { id: index } }" class="btn">
                            <Edit class="w-4 h-4"></Edit>Edit
                        </RouterLink>
                        <button class="btn" @click="changeStatus(index)">
                            <Ban class="w-4 h-4"></Ban>
                            {{ user.status === 'active' ? 'Disable' : 'Enable' }}
                        </button>
                    </div>
                </td>
            </tr>
        </HeaderTable>
    </AdminLayout>
</template>