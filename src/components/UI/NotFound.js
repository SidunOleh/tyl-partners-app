import { View } from 'react-native'
import { StyleSheet, Text, } from 'react-native'

export default function NotFound({ text, css, }) {
  return (
    <View style={[styles.container, css]}>
      <Text style={[styles.title,]}>
          {text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  title: {
      fontSize: 14,
      fontWeight: 800,
      color: '#EC1220',
      textTransform: 'uppercase',
  },
})