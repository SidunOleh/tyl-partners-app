import { useState } from "react"
import { StyleSheet, TouchableOpacity, View, } from "react-native"
import Menu from "./Menu"
import { useThemeStore } from "../../../store/useThemeStore"

export default function Burger() {
    const { theme } = useThemeStore()
    const [ open, setOpen ] = useState(false)

    const openMenu = () => {
        setOpen(true)
    }

    const closeMenu = () => {
        setOpen(false)
    }

    return (
        <View>
            <TouchableOpacity 
                style={styles.burgerContainer}
                onPress={openMenu}>
                <View style={[styles.burgerBar, {backgroundColor: theme == "dark" ? "#ffffffff" : "#323232"}]}/>
                <View style={[styles.burgerBar, {backgroundColor: theme == "dark" ? "#ffffffff" : "#323232"}]}/>
                <View style={[styles.burgerBar, {backgroundColor: theme == "dark" ? "#ffffffff" : "#323232"}]}/>
            </TouchableOpacity>

            <Menu visible={open} onClose={closeMenu}/>
        </View>
    )
}

const styles = StyleSheet.create({
    burgerContainer: {
        width: 27,
        height: 18,
        justifyContent: "space-between",
    },
    burgerBar: {
        width: 27,
        height: 3,
        borderRadius: 10,
    },
})