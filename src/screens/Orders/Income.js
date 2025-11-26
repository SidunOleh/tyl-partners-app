import { StyleSheet, ActivityIndicator, View, Animated, RefreshControl, Platform } from 'react-native'
import { useEffect, useState } from 'react'
import Order from '../../components/Orders/Order'
import NotFound from '../../components/UI/NotFound'
import { useOrdersStore } from '../../store/useOrdersStore'
import OrdersService from '../../services/OrdersService'
import AcceptModal from '../../components/Orders/Modals/Accept'
import DeclineModal from '../../components/Orders/Modals/Decline'

export default function IncomeOrdersScreen() {
    const [ data, setData ] = useState([])
    const { incomeOrders, setIncomeOrders } = useOrdersStore()
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ loading, setLoading ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ page, setPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(1)
    const [ tintColor, seTintColor ] = useState("#EC1220fd")
    const [ showAcceptModal, setShowAcceptModal ] = useState(false)
    const [ acceptItem, setAcceptItem ] = useState(null)
    const [ showDeclineModal, setShowDeclineModal ] = useState(false)
    const [ declineItem, setDeclineItem, ] = useState(null)
    
    useEffect(() => {
        setTimeout(() => seTintColor("#EC1220"), 50)
    }, [])

    useEffect(() => {
        if (incomeOrders.length) {
            setData(incomeOrders)
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
        const res = await OrdersService.getIncomeOrders(pageNumber)

        if (res.success) {
            const orders = res.orders?.data ?? []

            setPage(pageNumber)
            setTotalPages(Math.ceil(res.orders.meta.total / res.orders.meta.per_page))

            if (pageNumber === 1) {
                setData(orders)
                setIncomeOrders(orders)
            } else {
                setData(prev => [...prev, ...orders])
            }
        } else {
            console.error(res.message)
        }
    }

    const accepted = item => {
        setData(prev => {
            const updated = prev.filter(order => order.id != item.id)
            setIncomeOrders(updated)
            return updated
        })
    }

    const declined = item => {
        setData(prev => {
            const updated = prev.filter(order => order.id != item.id)
            setIncomeOrders(updated)
            return updated
        })
    }

    return (
        <>
        <Animated.FlatList
            data={data}
            renderItem={({ item }) => <Order 
                item={item} 
                showActions={true}
                accept={() => {
                    setAcceptItem(item)
                    setShowAcceptModal(true)
                }}
                decline={() => {
                    setDeclineItem(item)
                    setShowDeclineModal(true)
                }}/>
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
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                    colors={["#EC1220"]}
                    tintColor={tintColor}/>
            }/>

        <AcceptModal 
            item={acceptItem}
            visible={showAcceptModal}
            onClose={() => setShowAcceptModal(false)}
            accepted={() => accepted(acceptItem)}/>

        <DeclineModal 
            item={declineItem}
            visible={showDeclineModal}
            onClose={() => setShowDeclineModal(false)}
            declined={() => declined(declineItem)}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
})
