import { StyleSheet, View } from "react-native"
import StopList from "../../components/StopList/StopList/List"
import ProductsList from "../../components/StopList/ProductsList/List"
import { useEffect, useState } from "react"
import ProductsService from "../../services/ProductsService"
import { useProductsStore } from "../../store/useProductsStore"

export default function StopListScreen() {
    const [ data, setData ] = useState([])
    const { stopList, setStopList, addToStopList, removeFromStopList } = useProductsStore()

    useEffect(() => {
        if (stopList.length) {
            setData(stopList)
        }

        getData()
    }, [])

    const getData = async () => {
        const res = await ProductsService.getStopListProducts()

        if (res.success) {
            setData(res.products)
            setStopList(res.products)
        }
    }

    const addItem = async item => {
        setData(prev => [item, ...prev])
        addToStopList(item)
    }

    const removeItem = async item => {
        setData(prev => prev.filter(product => product.id != item.id))
        removeFromStopList(item)
    }

    return (
        <View style={[styles.container]}>
            <StopList 
                stopList={data} 
                removeItem={removeItem}/>

            <ProductsList 
                stopList={data} 
                addItem={addItem} 
                removeItem={removeItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
    },
})