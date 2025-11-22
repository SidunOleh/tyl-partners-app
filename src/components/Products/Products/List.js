import { StyleSheet, View, RefreshControl } from "react-native"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist"
import NotFound from "../../UI/NotFound"
import ProductItem from "./Item"
import { useProductsStore } from "../../../store/useProductsStore"
import ProductsService from "../../../services/ProductsService"
import ProductModal from "./Modal"

const ProductsList = forwardRef((props, ref) => {
    const [ catId, setCatId ] = useState(null)
    const { categoryProducts, setCategoryProducts } = useProductsStore()
    const [ data, setData ] = useState({
        category: null,
        products: [],
    })
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ tintColor, setTintColor ] = useState("#EC1220fd")
    const [ openUpdateModal, setOpenUpdateModal ] = useState(false)
    const [ updateItem, setUpdateItem ] = useState(null)

    useEffect(() => {
        if  (props.categoryId) {
            setCatId(props.categoryId)
        }
    }, [props.categoryId])

    useEffect(() => {
        setTimeout(() => setTintColor("#EC1220"), 50)
    }, [])

    useImperativeHandle(ref, () => ({
        refresh,
        remove,
    }))

    useEffect(() => {
        if (! catId) {
            return
        }

        if (categoryProducts[catId]) {
            setData(categoryProducts[catId])
        }

        setTimeout(() => setRefreshing(true), 50)
        fetch(1).finally(() => {
            setIniLoading(false)
            setRefreshing(false)
        })
    }, [catId])


    const refresh = async () => {
        if (! refreshing && ! iniLoading) {
            setRefreshing(true)
            await fetch()
            setRefreshing(false)
        }
    }

    const fetch = async () => {
        const res = await ProductsService.getCategoryProducts(catId)

        if (res.success) {
            const data = res.data ?? {}

            setData(data)
            setCategoryProducts(catId, data)
        } else {
            console.error(res.message)
        }
    }

    const remove = item => {
        const updated = {...data}
        updated.products = updated.products.filter(el => el.id !== item.id)
        setData(updated)
        setCategoryProducts(catId, updated)
    }

    const reorder = async products => {
        const res = await ProductsService.reorderCategoryProducts(catId, products.map(item => ({
            id: item.id,
        })))

        if (res.success) {
            setCategoryProducts(catId, {...data, products})
        } else {
            console.error(res.message)
        }
    }

    return (
        <>
        <DraggableFlatList
            data={data.products ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, drag, isActive }) => (
                <ScaleDecorator activeScale={1.03}>
                    <ProductItem
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
            onDragEnd={(params) => {
                const updated = {...data}
                updated.products = params.data
                setData(updated)
                reorder(params.data)
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

        <ProductModal
            visible={openUpdateModal}
            onClose={() => setOpenUpdateModal(false)}
            item={updateItem}
            updated={refresh}
            categories={props.categories}
            packaging={props.packaging}/>
        </>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
})

export default ProductsList
