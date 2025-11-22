import { StyleSheet, ActivityIndicator, View, Animated, RefreshControl, } from 'react-native'
import { useEffect, useState } from 'react'
import Order from '../../components/Orders/Order'
import NotFound from '../../components/UI/NotFound'
import { useOrdersStore } from '../../store/useOrdersStore'
import OrdersService from '../../services/OrdersService'

export default function InWorkOrdersScreen() {
    const [ data, setData ] = useState([])
    const { inWorkOrders, setInWorkOrders } = useOrdersStore()
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ loading, setLoading ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ page, setPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(1)
    const [ tintColor, seTintColor ] = useState("#EC1220fd")
    
    useEffect(() => {
        setTimeout(() => seTintColor("#EC1220"), 50)
    }, [])

    useEffect(() => {
        if (inWorkOrders.length) {
            setData(inWorkOrders)
        }

        setTimeout(() => setRefreshing(true), 50)
        fetch(1).finally(() => {
            setIniLoading(false)
            setRefreshing(false)
        })
    }, [])

    const refresh = async () => {
        if (! refreshing && ! loading && ! iniLoading) {
            setRefreshing(true)
            await fetch(1)
            setRefreshing(false)
        }
    }

    const loadMore = async () => {
        if (page < totalPages && ! loading && ! refreshing && ! iniLoading) {
            setLoading(true)
            const nextPage = page + 1
            await fetch(nextPage)
            setLoading(false)
        }
    }

    const fetch = async (pageNumber) => {
        const res = await OrdersService.getInWorkOrders(pageNumber)

        if (res.success) {
            const orders = res.orders?.data ?? []

            setPage(pageNumber)
            setTotalPages(Math.ceil(res.orders.meta.total / res.orders.meta.per_page))

            if (pageNumber === 1) {
                setData(orders)
                setInWorkOrders(orders)
            } else {
                setData(prev => [...prev, ...orders])
            }
        } else {
            console.error(res.message)
        }
    }

    const done = item => {
        setData(prev => {
            const updated = prev.filter(order => order.id != item.id)
            setInWorkOrders(updated)
            return updated
        })
    }

    return (
        <Animated.FlatList
            data={data}
            renderItem={({ item }) => <Order 
                item={item} 
                showActions={true}
                done={done}/>
            }
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
            onEndReached={loadMore}
            onEndReachedThreshold={0}
            contentContainerStyle={{ paddingBottom: 12 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }}/>}
            ListFooterComponent={
                loading
                ? <ActivityIndicator style={{ padding: 20 }} color={'#EC1220'} size="small"/>
                : null
            }
            ListEmptyComponent={! iniLoading ? 
                <NotFound text="Нічого не знайдено" css={{ paddingTop: 50 }} /> 
                : null}
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
