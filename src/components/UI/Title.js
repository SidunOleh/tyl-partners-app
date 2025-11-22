import { StyleSheet, Text, } from 'react-native'

export default function Title({ text, css, }) {
  return (
    <Text style={[styles.title, css]}>
        {text}
    </Text>
  )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: 800,
        color: '#EC1220',
        textTransform: 'uppercase',
    },
})