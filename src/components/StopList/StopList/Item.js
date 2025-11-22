import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { useThemeStore } from "../../../store/useThemeStore"
import css from "../../../styles/css"
import Close from "../../../icons/Close"
import ProductsService from "../../../services/ProductsService"

export default function StopListItem({ item, removeItem }) {
    const { theme } = useThemeStore()

    const remove = async () => {
        if (item.id) {
            removeItem(item)
            const res = await ProductsService.removeFromStopList(item.id)
            if (! res.success) {
                alert(res.message)
            }
        }
    }

    return (
        <TouchableOpacity
            style={[styles.item, {
                backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF",
            }]}
            onPress={remove}>
            <Text style={[styles.text, {
                color: css[theme].text,
            }]}>
                {item.product.name.length > 15 ? item.product.name.substr(0, 15) + '...' : item.product.name}
            </Text>
            <Close color={css[theme].text} width={10} height={10}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    text: {
        fontSize: 16,
    },
})