import api from './api'

export default {
    async get(page) {
        try {
            const query = new URLSearchParams({
                page,
            })

            const res = await api.get(`/packaging?${query}`)

            return {
                success: true,
                packaging: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async getAll() {
        try {
            const res = await api.get('/packaging/all')

            return {
                success: true,
                packaging: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async create(data) {
        try {
            const res = await api.post('/packaging', data)

            return {
                success: true,
                data: res.data,
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
    async update(id, data) {
        try {
            const res = await api.put(`/packaging/${id}`, data)

            return {
                success: true,
                data: res.data,
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
    async delete(id) {
        try {
            await api.delete(`/packaging/${id}`)

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