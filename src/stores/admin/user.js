import { defineStore } from 'pinia'

export const useAdminUserStore = defineStore('admin-user', {
    state: () => ({
        list: [
            {
                name: 'Pinku',
                role: 'admin',
                status: 'active',
                updateAt: (new Date).toISOString()
            },
            {
                name: 'Ninku',
                role: 'admin',
                status: 'active',
                updateAt: (new Date).toISOString()
            }
        ]
    }),
    actions: {
        getUser(index) {
            return this.list[index]
        },
        updateUser(index, userData) {
            const fields = ['name','role','status']
            for (let field of fields) {
            this.list[index][field] = userData[field]
        }
            this.list[index].updateAt = (new Date).toISOString()
        },
        removeUser(index) {
            this.list.splice(index, 1)
        }
    }
})