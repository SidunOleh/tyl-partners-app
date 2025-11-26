import { StyleSheet, ActivityIndicator, View, Animated, RefreshControl, } from "react-native"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import NotFound from "../UI/NotFound"
import { useOrdersStore } from "../../store/useOrdersStore"
import CallCourierItem from "./Item"
import OrdersService from "../../services/OrdersService"

const CallCourierList = forwardRef((props, ref) => {
    const [ data, setData ] = useState([])
    const { courierOrders, setCourierOrders } = useOrdersStore()
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ loading, setLoading ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ page, setPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(1)
    const [ tintColor, seTintColor ] = useState("#EC1220fd")
    
    useEffect(() => {
        setTimeout(() => seTintColor("#EC1220"), 50)
    }, [])

    useImperativeHandle(ref, () => ({
        refresh,
    }))

    useEffect(() => {
        if (courierOrders.length) {
            setData(courierOrders)
        }
        
        setTimeout(() => setRefreshing(true), 50)
        fetch(1).then(() => {
            setRefreshing(false)
            setIniLoading(false)
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
        const res = await OrdersService.getCourierOrders(pageNumber)

        if (res.success) {
            const orders = res.orders?.data ?? []

            setPage(pageNumber)
            setTotalPages(Math.ceil(res.orders.meta.total / res.orders.meta.per_page))

            if (pageNumber === 1) {
                setData(orders)
                setCourierOrders(orders)
            } else {
                setData(prev => [...prev, ...orders])
            }
        } else {
            console.error(res.message)
        }
    }

    return (
        <Animated.FlatList
            data={data}
            renderItem={({ item }) => <CallCourierItem item={item}/>}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
            onEndReached={loadMore}
            onEndReachedThreshold={0}
            contentContainerStyle={{ paddingBottom: 12 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }}/>}
            ListFooterComponent={
                loading
                ? <ActivityIndicator style={{ padding: 20 }} color={"#EC1220"} size="small"/>
                : null
            }
            ListEmptyComponent={! iniLoading ? 
                <NotFound text="Нічого не знайдено" css={{ paddingTop: 50 }} /> 
                : null}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                    colors={["#EC1220"]}
                    tintColor={tintColor}/>
            }/>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
})

export default CallCourierList