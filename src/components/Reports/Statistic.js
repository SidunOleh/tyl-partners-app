import { StyleSheet, Text, View } from "react-native"
import { useThemeStore } from "../../store/useThemeStore"
import { formatPrice } from "../../utils/utils"
import css from "../../styles/css"

export default function Statistic({ data }) {
    const { theme } = useThemeStore()

    return (
        <View style={[styles.stat, {backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF"}]}>
            <View style={[styles.statItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                <Text style={[styles.statText, {color: css[theme].text}]}>
                    Кількість замовлень
                </Text>
                <Text style={[styles.statText, {color: css[theme].text}]}>
                    {data?.orders_count}
                </Text>
            </View>
            <View style={[styles.statItem, {borderBottomColor: theme == "dark" ? "#484848" : "#E6E6E6"}]}>
                <Text style={[styles.statText, {color: css[theme].text}]}>
                    Загальний чек
                </Text>
                <Text style={[styles.statText, {color: css[theme].text}]}>
                    {formatPrice(data?.total_check)}
                </Text>
            </View>
            <View style={[styles.statItem, {borderBottomWidth: 0}]}>
                <Text style={[styles.statText, {color: css[theme].text}]}>
                    Середній чек
                </Text>
                <Text style={[styles.statText, {color: css[theme].text}]}>
                    {formatPrice(data?.avg_check)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stat: {
        paddingHorizontal: 16,
        borderRadius: 5,
        marginHorizontal: 16,
    },
    statItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    statText: {
        fontWeight: 600,
    },  
})