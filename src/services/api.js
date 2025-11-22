import axios from "axios"
import Constants from "expo-constants"
import { useAuthStore } from "../store/useAuthStore"

const { API_URL } = Constants.expoConfig.extra

const api = axios.create({
    baseURL: API_URL + "/partners-app",
    timeout: 10000,
})

api.interceptors.request.use(
  async config => {
    const { token } = useAuthStore.getState()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    config.headers["ngrok-skip-browser-warning"] = "69420"
    
    return config
  },
  err => Promise.reject(err)
)

api.interceptors.response.use(
  response => response,
  err => {
    if (err.response?.status === 401) {
        const { logout } = useAuthStore.getState()
        logout()
    }

    return Promise.reject(err)
  }
)

export default api
