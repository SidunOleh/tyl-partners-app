import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"
import api from "./api"
import EchoService from "./EchoService"

let roomCh = null
let callbacks = []

export default {
    async listen(callback) {
        const { user } = useAuthStore.getState()

        if (! user) {
            return
        }

        const roomId = user.rooms[0]?.id ?? null

        if (! roomId) {
            return
        }

        if (! roomCh) {
            const echo = await EchoService.connect()
            
            roomCh = echo.private(`rooms.${roomId}`)

            roomCh.listen(".new-message", data => {
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
        roomCh = null
        callbacks = []

        const { user } = useAuthStore.getState()
        
        if (! user) {
            return
        }

        EchoService.connect().then(echo => {
            echo.leave(`private-App.Models.Partner.${user.id}`)
        })
    },
    async getRooms() {
        try {
            const res = await api.get("/chat/rooms")

            return {
                success: true,
                rooms: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async getMessages(roomId, lastMessage) {
        try {
            const res = await api.get(`/chat/rooms/${roomId}/messages?last_message=${lastMessage ?? ""}`)

            return {
                success: true,
                messages: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async sendMessage(roomId, content, files) {
        try {
            const data = new FormData()
            data.append("room_id", roomId)
            data.append("content", content)
            files.forEach(file => data.append("files[]", file))

            const res = await api.post("/chat/messages/send", data, {
                headers: {"Content-Type": "multipart/form-data"}
            })

            return {
                success: true,
                message: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
    async readRoom(roomId) {
        try {
            await api.post(`/chat/rooms/${roomId}/read`)

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
    async refreshUnreadTotal() {
        try {
            const res = await api.get("/chat/rooms/unread-total")

            const { changeCount } = useChatStore.getState()

            changeCount(res.data.unread_total)

            return {
                success: true,
                unread_total: res.data.unread_total,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
}