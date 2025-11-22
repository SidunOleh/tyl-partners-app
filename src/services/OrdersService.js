import api from './api'

export default {
    async getIncomeOrders(page) {
        try {
            const query = new URLSearchParams({
                page,
            })

            const res = await api.get(`/orders/income?${query}`)

            return {
                success: true,
                orders: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async getInWorkOrders(page) {
        try {
            const query = new URLSearchParams({
                page,
            })

            const res = await api.get(`/orders/in-work?${query}`)

            return {
                success: true,
                orders: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },    
    async getDoneOrders(page) {
        try {
            const query = new URLSearchParams({
                page,
            })

            const res = await api.get(`/orders/done?${query}`)

            return {
                success: true,
                orders: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    }, 
    async getCanceledOrders(page) {
        try {
            const query = new URLSearchParams({
                page,
            })

            const res = await api.get(`/orders/canceled?${query}`)

            return {
                success: true,
                orders: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    }, 
    async acceptOrder(orderId, data) {
        try {
            const res = await api.post(`/orders/${orderId}/accept`, data)

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
    async declineOrder(orderId, data) {
        try {
            const res = await api.post(`/orders/${orderId}/decline`, data)

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
    async doneOrder(orderId, data) {
        try {
            const res = await api.post(`/orders/${orderId}/done`, data)

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
    async getCourierOrders(page) {
        try {
            const query = new URLSearchParams({
                page,
            })

            const res = await api.get(`/call-courier?${query}`)

            return {
                success: true,
                orders: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    }, 
    async createCourierOrder(data) {
        try {
            const res = await api.post('/call-courier', data)

            return {
                success: true,
                order: res.data,
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
    async getStatistic(start, end) {
        try {
            const query = new URLSearchParams({
                start, end
            })

            const res = await api.get(`/orders/statistic?${query}`)

            return {
                success: true,
                statistic: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
}