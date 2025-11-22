import { StyleSheet, Text, TouchableOpacity, } from "react-native"

export default function Btn({ text, onPress, css, disabled }) {
  return (
    <TouchableOpacity 
        style={[styles.btn, disabled && {opacity: 0.2}, css]}
        onPress={onPress}
        disabled={disabled}>
            <Text style={styles.btnText}>
                {text}
            </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: "#EC1220",
    },
    btnText: {
        fontWeight: 600,
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center",
    },
})