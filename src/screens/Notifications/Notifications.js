import { StyleSheet, ActivityIndicator, View, RefreshControl, Animated, } from 'react-native'
import { useEffect, useState } from 'react'
import NotFound from '../../components/UI/NotFound'
import Notification from '../../components/Notifications/Notification'
import { useNotificationsStore } from '../../store/useNotificationsStore'
import NotificationsService from '../../services/NotificationsService'

export default function NotificationsScreen() {
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)   
    const [ refreshing, setRefreshing ] = useState(false)
    const [ page, setPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(1)
    const { data: cachedData, setData: setCachedData, changeCount, count, } = useNotificationsStore()
    const [ tintColor, seTintColor ] = useState("#EC1220fd")
    
    useEffect(() => {
        setTimeout(() => seTintColor("#EC1220"), 50)
    }, [])

    useEffect(() => {
        if (cachedData.length) {
            setData(cachedData)
        }

        setTimeout(() => setRefreshing(true), 50)
        fetch(1).finally(() => {
            setRefreshing(false)
            setIniLoading(false)
        })
    }, [])

    const loadMore = async () => {
        if (page < totalPages && ! loading && ! refreshing && ! iniLoading) {
            setLoading(true)
            await fetch(page + 1)
            setLoading(false)
        }
    }

    const refresh = async () => {
        if (! refreshing && ! loading && ! iniLoading) {
            setRefreshing(true)
            await fetch(1)
            setRefreshing(false)
        }
    }

    const fetch = async (pageNumber) => {
        const res = await NotificationsService.getNotifications(pageNumber)

        if (res.success) {
            const notifications = res.notifications.data.data ?? []

            setPage(pageNumber)
            setTotalPages(Math.ceil(res.notifications.data.total / res.notifications.data.per_page))

            if (pageNumber === 1) {
                setData(notifications)
                setCachedData(notifications)
            } else {
                setData(prev => [...prev, ...notifications])
            }
        }
    }

    const read = async item => {
        setData(prev => {
            const updated = prev.map(notification => {
                return notification.id == item.id 
                    ? {...notification, read_at: new Date().toString()} 
                    : notification
            })

            setCachedData(updated)
            
            return updated
        })

        changeCount(count-1)
    }

    return (
        <Animated.FlatList
            data={data}
            renderItem={({ item }) => <Notification 
                item={item} 
                read={read}/>}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
            ListFooterComponent={
                loading ? (
                    <ActivityIndicator style={{padding: 20}} color={'#EC1220'} size="small"/>
                ) : null
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0}
            contentContainerStyle={{paddingBottom: 12}}
            ItemSeparatorComponent={() => <View style={{height: 12}} />}
            ListEmptyComponent={!iniLoading ? <NotFound text="Нічого не знайдено" css={{paddingTop: 50}}/> : null}
            refreshing={refreshing}
            onRefresh={refresh}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                    colors={["#EC1220"]}
                    tintColor={tintColor}/>
            }/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
})
