import { StyleSheet, Text, } from "react-native"

export default function Error({ text, css, }) {
  return (
    <Text style={[styles.error, css]}>
        {text}
    </Text>
  )
}

const styles = StyleSheet.create({
    error: {
        fontSize: 12,
        fontWeight: 500,
        color: "#EC1220",
    },
})