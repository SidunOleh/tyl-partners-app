import { StyleSheet, View } from "react-native"
import { useThemeStore } from "../../store/useThemeStore"

export default function Line({ css }) {
    const { theme } = useThemeStore()

    return (
        <View style={[styles.line, {backgroundColor: theme == "dark" ? "#484848" : "#E6E6E6"}, css]}/>
    )
}


const styles = StyleSheet.create({
    line: {
        height: 1,
        marginVertical: 10,
    }, 
})