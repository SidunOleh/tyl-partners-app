import api from "./api"

export default {
    async getProducts(page) {
        try {
           const query = new URLSearchParams({
                page,
            })

            const res = await api.get(`/products?${query}`)

            return {
                success: true,
                products: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async createProduct(data) {
        try {
            const res = await api.post('/products', data)

            return {
                success: true,
                product: res.data,
            }
        } catch (err) {
            return {
                success: false,
                status: err?.response?.status,
                message: err?.response?.data?.message ?? err.message,
                errors: err?.response?.data?.errors ?? {},
            }
        }
    },
    async updateProduct(id, data) {
        try {
            const res = await api.put(`/products/${id}`, data)

            return {
                success: true,
                product: res.data,
            }
        } catch (err) {
            return {
                success: false,
                status: err?.response?.status,
                message: err?.response?.data?.message ?? err.message,
                errors: err?.response?.data?.errors ?? {},
            }
        }
    },
    async deleteProduct(id) {
        try {
            await api.delete(`/products/${id}`)

            return {
                success: true,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async getStopListProducts() {
        try {
            const res = await api.get('/stop-list/products')

            return {
                success: true,
                products: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async addToStopList(data) {
        try {
            const res = await api.post('/stop-list/products', data)

            return {
                success: true,
                product: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async removeFromStopList(id) {
        try {
            await api.delete(`/stop-list/products/${id}`)

            return {
                success: true,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async getCategories() {
        try {
            const res = await api.get('/categories')

            return {
                success: true,
                categories: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async createCategory(data) {
        try {
            const res = await api.post('/categories', data)

            return {
                success: true,
                category: res.data,
            }
        } catch (err) {
            return {
                success: false,
                status: err?.response?.status,
                message: err?.response?.data?.message ?? err.message,
                errors: err?.response?.data?.errors ?? {},
            }
        }
    },
    async updateCategory(id, data) {
        try {
            const res = await api.put(`/categories/${id}`, data)

            return {
                success: true,
                category: res.data,
            }
        } catch (err) {
            return {
                success: false,
                status: err?.response?.status,
                message: err?.response?.data?.message ?? err.message,
                errors: err?.response?.data?.errors ?? {},
            }
        }
    },
    async deleteCategory(id) {
        try {
            await api.delete(`/categories/${id}`)

            return {
                success: true,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async reorderCategories(tree) {
        try {
            await api.post('/categories/reorder', {tree})

            return {
                success: true,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async getCategoryProducts(id) {
        try {
            const res = await api.get(`/categories/${id}/products`)

            return {
                success: true,
                data: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async reorderCategoryProducts(id, products) {
        try {
            await api.post(`/categories/${id}/products/reorder`, {products})

            return {
                success: true,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
}
