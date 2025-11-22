import { StyleSheet, Modal, View, TouchableOpacity, Text, Platform, Linking, } from "react-native"
import Close from "../../../icons/Close"
import { useState } from "react"
import css from "../../../styles/css"
import ThemeSwitcher from "./ThemeSwitcher"
import LogoutBtn from "./LogoutBtn"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { useThemeStore } from "../../../store/useThemeStore"
import Tg from "../../../icons/Tg"
import { useAuthStore } from "../../../store/useAuthStore"

export default function Menu({ visible, onClose }) {
    const { theme } = useThemeStore()
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()
    const [ animation, setAnimation ] = useState("slide")
    const { user } = useAuthStore()

    const navigateTo = (screen) => {
        setAnimation("none")
        navigation.navigate(screen)
        onClose()
        setTimeout(() => setAnimation("slide"))
    }

    function openTg() {
        Linking.openURL(user.tg_link)
    }

    return (
        <Modal visible={visible} transparent animationType={animation}>
            <View style={[styles.container, {
                backgroundColor: css[theme].backgroundColor, 
                paddingTop: Platform.OS === "android" ? insets.top+10 : insets.top+30,
            }]}>
                <TouchableOpacity 
                    style={styles.close}
                    onPress={onClose}>
                    <Close color={theme == "dark" ? "white" : "#323232"}/>
                </TouchableOpacity>

                <View style={styles.menu}>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                        <TouchableOpacity 
                            style={styles.menuLink}
                            onPress={() => navigateTo("info")}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Про заклад
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                        <TouchableOpacity 
                            style={styles.menuLink}
                            onPress={() => navigateTo("stop-list")}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Стоп-лист
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                        <TouchableOpacity 
                            style={styles.menuLink}
                            onPress={() => navigateTo("categories")}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Товари
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                        <TouchableOpacity 
                            style={styles.menuLink}
                            onPress={() => navigateTo("packaging")}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Пакування
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                        <TouchableOpacity 
                            style={styles.menuLink}
                            onPress={() => navigateTo("reports")}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Звіти
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                        <TouchableOpacity 
                            style={styles.menuLink}
                            onPress={() => navigateTo("call-courier")}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Викликати кур'єра
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                        <TouchableOpacity 
                            style={styles.menuLink}
                            onPress={() => navigateTo("orders.canceled")}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Скасовані замовлення
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6", paddingBottom: 7, paddingTop: 7}]}>
                        <View style={[styles.menuLink, {flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Телеграм
                            </Text>
                            <TouchableOpacity onPress={openTg}>
                                <Tg color={theme == "dark" ? "white" : "#323232"}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.menuItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6", paddingBottom: 7, paddingTop: 7}]}>
                        <View style={[styles.menuLink, {flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
                            <Text style={[styles.menuText, {color: css[theme].text}]}>
                                Тема
                            </Text>
                            <ThemeSwitcher/>
                        </View>
                    </View>
                </View>              

                <View style={styles.logout}>
                    <LogoutBtn/>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    close: {
        alignItems: "flex-end",
        paddingRight: 16,
    },  
    menuText: {
        fontSize: 18,
        fontWeight: 700,
    },  
    menuItem: {
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
    },
    menuLink: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    menu: {
        marginBottom: 26,
    },
    logout: {
        paddingLeft: 16,
        paddingRight: 16,
    },  
    tg: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
        alignItems: 'flex-start',
    },
})