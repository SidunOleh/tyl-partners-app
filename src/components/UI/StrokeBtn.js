import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useThemeStore } from '../../store/useThemeStore'

export default function StrokeBtn({ text, onPress, disabled, css }) {
    const { theme } = useThemeStore()

    return (
        <TouchableOpacity
            style={[
                css,
                styles.btn,
                {borderColor: theme == 'dark' ? '#FFFFFF' : '#EC1220',},
                disabled && {opacity: 0.2},
            ]}
            onPress={onPress}
            disabled={disabled}>
            <Text style={[styles.btnText, {color: theme == 'dark' ? '#FFFFFF' : '#EC1220'}]}>
                {text}
            </Text>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 600,
    },
})