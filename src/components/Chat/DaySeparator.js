import { Text, View } from "react-native"
import { StyleSheet } from "react-native"
import css from "../../styles/css"
import { useThemeStore } from "../../store/useThemeStore"

export default function DaySeparator({ date }) {
    const { theme } = useThemeStore()

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        const formatted = new Intl.DateTimeFormat('uk-UA', { 
            day: 'numeric',
            month: 'long', 
        }).format(date)

        return formatted.replace(' о ', '')
    }

    return  (
    <View style={[styles.dateSeparator]}>
        <Text style={[styles.text, {color: css[theme].text, borderColor: css[theme].text}]}>
            {formatDate(date)}
        </Text>
    </View>)
}

const styles = StyleSheet.create({
    dateSeparator: {
        alignItems: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 600,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 16,
        color: 'white',
        borderWidth: 1,
    },
})