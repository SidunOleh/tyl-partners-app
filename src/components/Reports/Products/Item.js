import { StyleSheet, Text, View } from "react-native"
import { useThemeStore } from "../../../store/useThemeStore"
import css from "../../../styles/css"
import { formatPrice } from "../../../utils/utils"

export default function ProductItem({ item }) {
    const { theme } = useThemeStore()

    return (
        <View style={[styles.item, {backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF",}]}>
            <Text style={[styles.text, {
                color: css[theme].text,
            }]}>
                {item.name}
            </Text>
            <Text style={[styles.text, {
                color: css[theme].text,
            }]}>
                {formatPrice(item.amount)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {

    },
})
