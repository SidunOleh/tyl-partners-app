import { StyleSheet, TouchableOpacity, View, } from "react-native"
import Sun from "../../../icons/Sun"
import Moon from "../../../icons/Moon"
import { useThemeStore } from "../../../store/useThemeStore"

export default function ThemeSwitcher() {
  const { theme, change } = useThemeStore()

  return (
    <View>
        <View style={[styles.container, {backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF"}]}>
            <TouchableOpacity 
                style={[styles.item, {backgroundColor: theme == "light" ? "#FFE7E9" : "transparent"}]}
                onPress={() => change("light")}>
                <Sun color={theme == "light" ? '#EC1220' : '#D1D1D6'}/>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.item, {backgroundColor: theme == "dark" ? "#FFE7E9" : "transparent"}]}
                onPress={() => change("dark")}>
                <Moon color={theme == "dark" ? '#EC1220' : '#D1D1D6'}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 5,
        borderRadius: 143,
        gap: 4,
    },  
    item: {
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        borderRadius: "50%",
    },
})