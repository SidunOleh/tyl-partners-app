import { StyleSheet, TouchableOpacity, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { useThemeStore } from "../../store/useThemeStore"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import css from "../../styles/css"
import { useNavigation } from "@react-navigation/native"
import Title from "../../components/UI/Title"
import Arrow from "../../icons/Arrow"

export default function FullScreenLayout({children, title, arrow = true}) {
    const { theme } = useThemeStore()
    const insets = useSafeAreaInsets()
    const navigation = useNavigation()

    return (
        <>
            <StatusBar style={theme == "dark" ? "light" : "dark"}/>

            <View style={[styles.container, {
                backgroundColor: css[theme].backgroundColor, 
                paddingTop: insets.top,   
                paddingBottom: insets.bottom,          
            }]}>
                <View style={styles.main}>
                    <View>
                        {arrow ?
                        <TouchableOpacity 
                            style={styles.arrow} 
                            onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate("orders.income")}>
                            <Arrow 
                                color={theme == "dark" ? "#FFFFFF" : "#000000"}
                                rotate="90deg"
                                height={10}
                                width={40}/>
                        </TouchableOpacity> : null}

                        <Title text={title} css={styles.title}/>
                    </View>

                    {children}
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
        paddingTop: 20,
    },
    title: {
        marginBottom: 24,
        textAlign: "center",
    },
    arrow: {
        position: "absolute",
        left: 0,
        top: 10,
        zIndex: 1000,
        paddingRight: 10,
    },
})