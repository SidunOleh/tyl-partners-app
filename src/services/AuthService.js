import api from "./api"
import { useAuthStore } from "../store/useAuthStore"

export default {
    async sendCode(phone) {
        try {
            await api.post("/send-code", {phone})

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
    async login(code) {
        try {
            const res = await api.post("/login", {code})

            const { login, setUser } = useAuthStore.getState()
            login(res.data.token)
            setUser(res.data.me)

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
    async logout() {
        try {
            await api.post("/logout")

            const { logout } = useAuthStore.getState()
            logout()

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
