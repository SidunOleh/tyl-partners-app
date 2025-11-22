import { StyleSheet, Text, View, } from "react-native"

export default function Badge({ count, css }) {
    return (count > 0 ?
    <View style={[styles.count, css]}>
        <Text style={[styles.countText]}>
            {count > 99 ? "99+" : String(count)}
        </Text>
    </View> : null)
}

const styles = StyleSheet.create({
    count: {
        height: 12,
        minWidth: 12,
        paddingHorizontal: 2,
        backgroundColor: "#EC1220",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 3,
        right: 0,
    },
    countText: {
        fontSize: 9,
        color: "#FFFFFF",
    },
})