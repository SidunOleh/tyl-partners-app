import { StyleSheet, Text } from "react-native";

export default function Success({ text, css }) {
    return (
        <Text style={[styles.text, css]}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        fontWeight: 500,
        color: "rgb(101, 166, 35)",
    },
})