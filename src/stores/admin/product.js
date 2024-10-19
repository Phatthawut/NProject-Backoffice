import { defineStore } from 'pinia'

export const useAdminProductStore = defineStore('admin-product', {
    state: () => ({
        list: [],
        loaded: false
    }),
    actions: {
        loadProducts() {
            const products = localStorage.getItem('admin-products')
            if (products) {
                try {
                    this.list = JSON.parse(products)
                    this.loaded = true
                } catch (error) {
                    console.error('Error parsing products:', error)
                }
            } else {
                console.log('No products found in localStorage')
            }
        },
        getProduct (index) {
            if (!this.loaded) {
                this.loadProducts()
            }
            return this.list[index]
        },
        addProduct(productData) {
            productData.remainQuantity = productData.quantity
            productData.updateAt = (new Date()).toISOString()
            this.list.push(productData)
            localStorage.setItem('admin-products', JSON.stringify(this.list))
        },
        updateProduct(index, productData) {
            this.list[index].name = productData.name
            this.list[index].imageUrl = productData.imageUrl
            this.list[index].price = productData.price
            this.list[index].quantity = productData.quantity
            this.list[index].remainQuantity = productData.quantity
            this.list[index].status = productData.status
            this.list[index].updateAt = (new Date()).toISOString()
            localStorage.setItem('admin-products', JSON.stringify(this.list))
        },
        removeProduct(index){
            this.list.splice(index, 1)
            localStorage.setItem('admin-products', JSON.stringify(this.list))
        }
    }
})