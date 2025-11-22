import { StyleSheet, View, RefreshControl } from "react-native"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import NotFound from "../../UI/NotFound"
import CategoryItem from "./Item"
import { useProductsStore } from "../../../store/useProductsStore"
import ProductsService from "../../../services/ProductsService"
import CategoryModal from "./Modal"

const CategoriesList = forwardRef((props, ref) => {
    const { categories, setCategories } = useProductsStore()
    const [ data, setData ] = useState([])
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ tintColor, setTintColor ] = useState("#EC1220fd")
    const [ openUpdateModal, setOpenUpdateModal ] = useState(false)
    const [ updateItem, setUpdateItem ] = useState(null)

    useEffect(() => {
        setTimeout(() => setTintColor("#EC1220"), 50)
    }, [])

    useImperativeHandle(ref, () => ({
        refresh,
        remove,
        replace,
    }))

    useEffect(() => {
        if (categories.length > 0) {
            setData(categories)
        }

        setTimeout(() => setRefreshing(true), 50)
        fetch(1).finally(() => {
            setIniLoading(false)
            setRefreshing(false)
        })
    }, [])


    const refresh = async () => {
        if (! refreshing && ! iniLoading) {
            setRefreshing(true)
            await fetch()
            setRefreshing(false)
        }
    }

    const fetch = async () => {
        const res = await ProductsService.getCategories()

        if (res.success) {
            const categories = res.categories ?? []

            setData(categories)
            setCategories(categories)
        } else {
            console.error(res.message)
        }
    }

    const remove = item => {
        const updated = data.filter(el => el.id !== item.id)
        setData(updated)
        setCategories(updated)
    }

    const replace = item => {
        const updated = data.map(el => el.id === item.id ? item : el)
        setData(updated)
        setCategories(updated)
    }

    const reorder = async data => {
        const res = await ProductsService.reorderCategories(data.map(item => ({
            id: item.id,
            children: [],
        })))

        if (res.success) {
            setCategories(data)
        } else {
            console.error(res.message)
        }
    }

    return (
        <>
        <DraggableFlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, drag, isActive }) => (
                <ScaleDecorator activeScale={1.03}>
                    <CategoryItem
                        item={item}
                        drag={drag}
                        isActive={isActive}
                        remove={remove}
                        openUpdateModal={() => {
                            setUpdateItem(item)
                            setOpenUpdateModal(true)
                        }}/>
                </ScaleDecorator>
            )}
            onDragEnd={({ data }) => {
                setData(data)
                reorder(data)
            }}
            activationDistance={20}
            style={styles.container}
            containerStyle={{flex: 1}}
            contentContainerStyle={{ paddingBottom: 12 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }}/>}
            ListEmptyComponent={
                ! iniLoading ? <NotFound text="Нічого не знайдено" css={{ paddingTop: 50 }} /> : null
            }
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={refresh}
                    colors={["#EC1220"]}
                    tintColor={tintColor}/>
            }/>

        <CategoryModal
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
})

export default CategoriesList
