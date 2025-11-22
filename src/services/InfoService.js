import api from "./api"

export default {
    async get() {
        try {
            const res = await api.get("/info")

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
    async update(data) {
        try {
            await api.post("/info", data)

            return {
                success: true,
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
}
