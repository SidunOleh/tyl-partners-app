import { StyleSheet, ActivityIndicator, View, Animated, } from 'react-native'
import { useEffect, useState } from 'react'
import NotFound from '../../UI/NotFound'
import { useProductsStore } from '../../../store/useProductsStore'
import ProductsService from '../../../services/ProductsService'
import ProductItem from './Item'

export default function ProductsList({ stopList, addItem, removeItem, }) {
    const [ iniLoading, setIniLoading ] = useState(true)
    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)   
    const [ page, setPage ] = useState(1)
    const [ totalPages, setTotalPages ] = useState(1)
    const { products, setProducts } = useProductsStore()

    useEffect(() => {
        if (products.length) {
            setData(products)
        }

        fetch(1).finally(() => {
            setIniLoading(false)
        })
    }, [])

    const loadMore = async () => {
        if (page < totalPages && ! loading) {
            setLoading(true)
            await fetch(page + 1)
            setLoading(false)
        }
    }

    const fetch = async (pageNumber) => {
        const res = await ProductsService.getProducts(pageNumber)

        if (res.success) {
            const products = res.products.data ?? []

            setPage(pageNumber)
            setTotalPages(Math.ceil(res.products.meta.total / res.products.meta.per_page))

            if (pageNumber === 1) {
                setData(products)
                setProducts(products)
            } else {
                setData(prev => [...prev, ...products])
            }
        } else {
            console.log(res.message)
        }
    }

    return (
        <Animated.FlatList
            data={data}
            renderItem={({ item }) => <ProductItem 
                item={item}
                addItem={addItem}
                removeItem={removeItem}
                stopList={stopList}/>}
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
            ListEmptyComponent={!iniLoading ? <NotFound text="Товарів не знайдено" css={{paddingTop: 50}}/> : ''}
            ListHeaderComponent={iniLoading && 
                <View style={styles.refreshIndicator}>
                    <ActivityIndicator size="small" color={'#EC1220'} />
                </View>
            }/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    refreshIndicator: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
