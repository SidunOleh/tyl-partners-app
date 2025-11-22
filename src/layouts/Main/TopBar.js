import { Image, StyleSheet, Text, TouchableOpacity, View, } from "react-native"
import css from "../../styles/css"
import { useThemeStore } from "../../store/useThemeStore"
import Burger from "./Menu/Burger"
import NotificationBell from "./Notifications/Bell"
import { useNavigation } from "@react-navigation/native"

export default function TopBar({ title }) {
    const { theme } = useThemeStore()
     const navigation = useNavigation()

    const logoDark = require('../../../assets/splash-dark.png')
    const logoLight = require('../../../assets/splash-light.png')

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('orders.income')}>
                <Image style={[styles.image]} source={theme === 'dark' ? logoDark : logoLight}/>
            </TouchableOpacity>
            <Text style={[styles.title, {color: css[theme].text}]}>
                {title}
            </Text>
            <NotificationBell/>
            <Burger/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        zIndex: 1000,
        gap: 16,
    },  
    image: {
        width: 80,
        height: 40,
        objectFit: 'contain',
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
        textTransform: "uppercase",
        flex: 1,
        textAlign: "center",
    },
})