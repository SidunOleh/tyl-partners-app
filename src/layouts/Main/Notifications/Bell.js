import { TouchableOpacity, Vibration, View, } from "react-native"
import Bell from "../../../icons/Bell"
import { useNavigation } from "@react-navigation/native"
import New from "./New"
import Badge from "../../../components/UI/Badge"
import { useThemeStore } from "../../../store/useThemeStore"
import { useNotificationsStore } from "../../../store/useNotificationsStore"
import NotificationsService from "../../../services/NotificationsService"
import { useState } from "react"

export default function NotificationBell() {
    const navigation = useNavigation()
    const { theme } = useThemeStore()
    const { count, changeCount, newNotification, setNew, } = useNotificationsStore()
    const [ loading, setLoading ] = useState(false)

    async function read() {
        const id = newNotification.id
        setNew(null)
        changeCount(count - 1)
        await NotificationsService.markAsRead(id)
    }

    async function readAll() {
        try {
            Vibration.vibrate(500)
            setLoading(true)
            const res = await NotificationsService.readAll()
            if (res.success) {
                changeCount(0)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View>
            <TouchableOpacity 
                onPress={() => navigation.navigate("notifications")}
                onLongPress={readAll}
                delayLongPress={500}
                disabled={loading}>
                <Bell color={theme == "dark" ? "white" : "#323232"}/>
                <Badge count={count}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={read}>
                {newNotification ? <New notification={newNotification}/> : null}
            </TouchableOpacity>
        </View>
    )
}