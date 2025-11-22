import { StyleSheet, Text, View, } from "react-native"
import Info from "../../../icons/Info"

export default function NotificationNew({ notification }) {
  return (
    <View style={[styles.container]}>
        <Info color="#ffffff"/>

        {notification.type == 'orders.new' ? 
        <Text style={[styles.text,]}>
            Нове замовлення <Text style={{fontWeight: 600,}}>№{notification.order.number}</Text>
        </Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EC1220",
        paddingHorizontal: 12,
        paddingVertical: 16,
        borderRadius: 14,
        position: "absolute",
        top: 0,
        right: 20,
        zIndex: 1000,
        elevation: 5,
        width: 220,
        borderTopRightRadius: 0,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },  
    text: {
        fontSize: 12,
        fontWeight: 700,
        color: "white",
    },
})