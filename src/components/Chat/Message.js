import { StyleSheet, Text, View } from "react-native"
import File from "./File"
import { useAuthStore } from "../../store/useAuthStore"
import { useThemeStore } from "../../store/useThemeStore"

export default function Message({ msg }) {
    const { theme } = useThemeStore()
    const { user } = useAuthStore()

    const isCurrentUserMsg = msg.sender.id == user.id && msg.sender.type == 'App\\Models\\Partner'

    const formatDate = str => {
        const date = new Date(str)

        const options = {
            hour: 'numeric',
            minute: '2-digit',
        }

        return  new Intl.DateTimeFormat('uk-UA', options).format(date)
    }

    return <View style={[styles.container, {alignItems: isCurrentUserMsg ? 'flex-end' : 'flex-start'}]}>
        <View style={[styles.content]}>
            {!isCurrentUserMsg ? <Text style={[styles.name, {color: theme == 'dark' ? '#FFFFFF' : '#0D082C',}]}>
                Диспетчер
            </Text> : ''}
            <View style={[styles.contentContainer, {
                backgroundColor: theme == 'dark' ? (isCurrentUserMsg ? '#464646' : '#8B8B8B') : (isCurrentUserMsg ? '#E6E6E6' : '#FFF0F1'),
                borderTopStartRadius: !isCurrentUserMsg ? 0 : styles.text.borderRadius,
                borderTopEndRadius: isCurrentUserMsg ? 0 : styles.text.borderRadius,
            }]}>
                {msg.files.length ? 
                <View style={[styles.files,]}>
                    {msg.files.map(file => <File key={file.path} file={file}/>)}
                </View> : ''}
                {msg.content ?
                <Text style={[styles.text, {color: theme == 'dark' ? '#FFFFFF' : '#0D082C',}]}>
                    {msg.content}
                </Text> : ''}
            </View>
            <Text style={[styles.date, {
                color: theme == 'dark' ? '#FFFFFF66' : '#0D082C66',
                alignSelf: isCurrentUserMsg ? 'flex-end' : 'flex-start',
            }]}>
                {formatDate(msg.created_at)}
            </Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        
    },
    content: {
        gap: 5,
    },
    contentContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    text: {
        fontSize: 16,
    },
    date: {
        fontSize: 12,
    },
    name: {
        fontSize: 14,
        fontWeight: 600,
    },
    files: {
        gap: 5,
    },
})