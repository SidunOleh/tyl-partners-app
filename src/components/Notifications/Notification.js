import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native'
import Info from '../../icons/Info'
import { useThemeStore } from '../../store/useThemeStore'
import NotificationsService from '../../services/NotificationsService'
import { useState } from 'react'
import css from '../../styles/css'

export default function Notification({ item, read}) {
    const { theme } = useThemeStore()
    const [ loading, setLoading ] = useState(false)

    const onRead = async () => {
        if (loading) {
            return
        }

        setLoading(true)
        const res = await NotificationsService.markAsRead(item.id)
        setLoading(false)

        if (res.success) {
            read(item)
        }
    }

    return (
        <TouchableOpacity 
            style={[styles.container, {
                backgroundColor: !item.read_at ? '#EC1220' : (theme == 'dark' ? '#272727' : '#FFFFFF'),
                opacity: loading ? 0.2 : 1,
            }]}
            onPress={() => !item.read_at && onRead(item)} disabled={Boolean(item.read_at) || loading}>
            <View style={[styles.content]}>
                <Info color={!item.read_at ? '#FFFFFF' : (theme == 'dark' ? '#FFFFFF' : '#272727')}/>
                
                {item.type == 'App\\Notifications\\OrderSentToPartner' ? 
                <Text style={[styles.text, {color: !item.read_at ? '#FFFFFF' : css[theme].text}]}>
                    Нове замовлення <Text style={{fontWeight: 600, lineHeight: 16}}>№{item.data.order.number}</Text>
                </Text> : null}
            </View>
        </TouchableOpacity>
    )
    }

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    text: {
        fontSize: 16,
        lineHeight: 16,
    },
})