import { StyleSheet, TouchableOpacity, View, } from "react-native"
import IncomeOrders from "../../icons/IncomeOrders"
import InWorkOrders from "../../icons/InWorkOrders"
import DoneOrders from "../../icons/DoneOrders"
import Chat from "../../icons/Chat"
import { useNavigation, useRoute } from "@react-navigation/native"
import Badge from "../../components/UI/Badge"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useThemeStore } from "../../store/useThemeStore"
import { useChatStore } from "../../store/useChatStore"

export default function NavBar() {
    const { theme } = useThemeStore()
    const navigation = useNavigation()
    const route = useRoute()
    const insets = useSafeAreaInsets()
    const { count } = useChatStore()

    return (
        <View style={[styles.container, {
            backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF",
            paddingBottom: insets.bottom + 5,
        }]}>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("orders.income")}>
                <IncomeOrders color={route?.name == "orders.income" ? '#EC1220' : theme == 'dark' ?  '#FFFFFF' : '#000000'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("orders.in-work")}>
                <InWorkOrders color={route?.name == "orders.in-work" ? '#EC1220' : theme == 'dark' ?  '#FFFFFF' : '#000000'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("orders.done")}>
                <DoneOrders color={route?.name == "orders.done" ? '#EC1220' : theme == 'dark' ?  '#FFFFFF' : '#000000'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("chat")}>
                <Chat color={route?.name == "chat" ? '#EC1220' : theme == 'dark' ?  '#FFFFFF' : '#000000'}/>
                <Badge count={count} css={{bottom: 0, right: 18}}/>
            </TouchableOpacity>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 26,
    },  
    icon: {
        paddingHorizontal: 20,
    }
})