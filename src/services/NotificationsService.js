import { useAuthStore } from "../store/useAuthStore"
import { useNotificationsStore } from "../store/useNotificationsStore"
import api from "./api"
import EchoService from "./EchoService"

let notificationCh = null
let callbacks = []

export default  {
    async listen(callback) {
        const { user } = useAuthStore.getState()

        if (! user) {
            return
        }

        if (! notificationCh) {
            const echo = 
                await EchoService.connect()
            notificationCh = 
                echo.private('App.Models.Partner.' + user.id)
            notificationCh.notification(data => {
                callbacks.forEach(callback => {
                    callback(data)
                })
            })
        }

        callbacks.push(callback)
    },
    async detachListener(callback) {
        callbacks = callbacks.filter(item => item != callback)
    },
    leave() {
        notificationCh = null
        callbacks = []

        const { user } = useAuthStore.getState()
        
        if (! user) {
            return
        }

        EchoService.connect().then(echo => {
            echo.leave(`private-App.Models.Partner.${user.id}`)
        })
    },
    async getNotifications(page) {
        try {
            const query = new URLSearchParams({
                page,
            })

            const res = await api.get(`/notifications?${query}`)

            return {
                success: true,
                notifications: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async markAsRead(id) {
        try {
            await api.post(`/notifications/mark-as-read/${id}`)

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
    async readAll() {
        try {
            await api.post('/notifications/read-all')

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
    async refreshUnreadCount() {
        const res = await this.getNotifications(1)
    
        if (res.success) {
            const { changeCount } = useNotificationsStore.getState()

            changeCount(res.notifications.total_unread)
        }
    },
}