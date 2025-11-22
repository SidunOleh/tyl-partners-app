import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import css from "../../styles/css"
import { useThemeStore } from "../../store/useThemeStore"

export default function FileList({ files, onDelete }) {
    const { theme } = useThemeStore()

    return <View style={[styles.container]}>
        {files.map((file, i) => {
            return (
                <TouchableOpacity key={i} onPress={() => onDelete(file)}>
                    <Text style={[styles.text, {color: css[theme].text}]}>
                       {file.name}
                    </Text>
                </TouchableOpacity>
            )
        })}
    </View>
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
    },
    text: {
        fontSize: 14,
    },
})