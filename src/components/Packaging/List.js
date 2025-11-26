import { StyleSheet, ActivityIndicator, View, Animated, RefreshControl } from "react-native"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import NotFound from "../UI/NotFound"
import { usePackagingStore } from "../../store/usePackagingStore"
import PackagingService from "../../services/PackagingService"
import PackagingItem from "./Item"
import PackagingModal from "./Modal"

const PackagingList = forwardRef((props, ref) => {
    const [ data, setData ] = useState([])
    const { data: cachedData, setData: setCachedData } = usePackagingStore()
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ loading, setLoading ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ page, setPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(1)
    const [ tintColor, seTintColor ] = useState("#EC1220fd")
    const [ openUpdateModal, setOpenUpdateModal ] = useState(false)
    const [ updateItem, setUpdateItem ] = useState(null)
    
    useEffect(() => {
        setTimeout(() => seTintColor("#EC1220"), 50)
    }, [])

    useImperativeHandle(ref, () => ({
        refresh,
        remove,
    }))

    useEffect(() => {
        if (cachedData.length) {
            setData(cachedData)
        }
        
        setTimeout(() => setRefreshing(true), 50)
        fetch(1).finally(() => {
            setIniLoading(false)
            setRefreshing(false)
        })
    }, [])

    const refresh = async () => {
        if  (! refreshing && ! loading && ! iniLoading) {
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
        const res = await PackagingService.get(pageNumber)

        if (res.success) {
            const packaging = res.packaging?.data ?? []

            setPage(pageNumber)
            setTotalPages(Math.ceil(res.packaging.meta.total / res.packaging.meta.per_page))

            if (pageNumber === 1) {
                setData(packaging)
                setCachedData(packaging)
            } else {
                setData(prev => [...prev, ...packaging])
            }
        } else {
            console.error(res.message)
        }
    }

    const remove = item => {
        const updated = data.filter(el => el.id != item.id)
        setData(updated)
        setCachedData(updated)
    }

    const replace = item => {
        const updated = data.map(el => el.id == item.id ? item : el)
        setData(updated)
        setCachedData(updated)
    }

    return (
        <>
        <Animated.FlatList
            data={data}
            renderItem={({ item }) => 
                <PackagingItem 
                    item={item} 
                    remove={remove} 
                    openUpdateModal={() => {
                        setUpdateItem(item)
                        setOpenUpdateModal(true)
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

        <PackagingModal
            visible={openUpdateModal}
            onClose={() => setOpenUpdateModal(false)}
            item={updateItem}
            updated={replace}/>
        </>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    refreshIndicator: {
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default PackagingList