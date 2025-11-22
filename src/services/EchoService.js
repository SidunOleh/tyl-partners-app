import Echo from 'laravel-echo'
import Pusher from 'pusher-js/react-native'
import Constants from 'expo-constants'
import { useAuthStore } from "../store/useAuthStore"

let echo = null

export default {
    async connect() {
        if (echo) {
            return echo
        }

        const { token } = useAuthStore.getState()

        const { API_URL, PUSHER_APP_KEY } = Constants.expoConfig.extra

        const pusherClient = new Pusher(PUSHER_APP_KEY, {
            cluster: 'eu',
            forceTLS: true,
            authEndpoint: API_URL + '/broadcasting/auth',
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            }
        })

        echo = new Echo({
            broadcaster: 'pusher',
            client: pusherClient,
        })

        return echo
    },
    disconnect() {
        if (echo) {
            echo.disconnect()
            echo = null
        }
    },
}