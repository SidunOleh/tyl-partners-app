import api from "./api"
import * as Notifications from "expo-notifications"
import { useAuthStore } from "../store/useAuthStore"

const PushNotificationService = {
    getAndStoreToken: async () => {
        const token = await PushNotificationService.getToken()

        if (token) {
            await PushNotificationService.storeToken(token)
        }
    },
    getToken: async () => {
        const { status } = await Notifications.requestPermissionsAsync()

        if (status !== 'granted') {
            return
        }

        const token = await Notifications.getExpoPushTokenAsync()

        return token
    },
    storeToken: async token => {
        try {
            await api.post('/device-tokens', {
                token: token.data,
            })

            const { setPushToken } = useAuthStore.getState()
            setPushToken(token.data)

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
    deleteToken: async () => {
        try {
            const { pushToken, deletePushToken } = useAuthStore.getState()

            if (! pushToken) {
                return
            }

            await api.delete(`/device-tokens/${pushToken}`)

            deletePushToken()

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

export default PushNotificationService