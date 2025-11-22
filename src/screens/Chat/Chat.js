import { StyleSheet, View } from 'react-native'
import css from '../../styles/css'
import Chat from '../../components/Chat/Chat'
import { useThemeStore } from '../../store/useThemeStore'

export default function ChatScreen({ route }) {
    const { theme } = useThemeStore()

    return (
        <View style={[styles.container, {backgroundColor: css[theme].backgroundColor,}]}>
            <Chat text={route.params?.text ?? ''}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
})
