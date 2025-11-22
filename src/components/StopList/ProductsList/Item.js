import { StyleSheet, Switch, Text, View } from "react-native"
import { useThemeStore } from "../../../store/useThemeStore"
import css from "../../../styles/css"
import { useEffect, useState } from "react"
import ProductsService from "../../../services/ProductsService"

export default function ProductItem({ item, addItem, removeItem, stopList }) {
    const { theme } = useThemeStore()
    const [ inStopList, setInStopList ] = useState(null)

    useEffect(() => {
        setInStopList(stopList.find(stopListItem => stopListItem.product.id == item.id))
    }, [stopList])

    const change = async value => {
        if (value) {
            const newItem = {
                product: item,
            }
            addItem(newItem)
            const res = await ProductsService.addToStopList({product_id: item.id})
            if (res.success) {
                newItem.id = res.product.id
            } else {
                alert(res.message)
            }
        } else {
            if (inStopList.id) {
                removeItem(inStopList)
                const res = await ProductsService.removeFromStopList(inStopList.id)
                if (! res.success) {
                    alert(res.message)
                }
            }
        }
    }

    return (
        <View style={[styles.item, {
            backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF",
        }]}>
            <Text style={[styles.text, {
                color: css[theme].text,
                flexShrink: 1,
            }]}>
                {item.name}
            </Text>

            <Switch 
                value={Boolean(inStopList)}
                onValueChange={change}
                trackColor={{false: 'rgba(0, 0, 0, 0.23)', true: '#EC1220'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 16,
    },
})