import { StyleSheet, View, } from "react-native"
import css from "../../styles/css"
import { StatusBar } from "expo-status-bar"
import TopBar from "./TopBar"
import NavBar from "./NavBar"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useThemeStore } from "../../store/useThemeStore"

export default function MainLayout({children, title}) {
    const { theme } = useThemeStore()
    const insets = useSafeAreaInsets()
    
    return (
        <>
        <StatusBar style={theme == "dark" ? "light" : "dark"}/>

        <View style={[styles.container, {
            backgroundColor: css[theme].backgroundColor, 
            paddingTop: insets.top,
        }]}>
            <View style={styles.main}>
                <TopBar title={title}/>
                <View style={styles.content}>
                    {children}
                </View>
                <NavBar/>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
})
