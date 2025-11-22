import { StyleSheet, View } from "react-native"
import Btn from "../../components/UI/Btn"
import ProductsList from "../../components/Products/Products/List"
import { useEffect, useRef, useState } from "react"
import ProductModal from "../../components/Products/Products/Modal"
import ProductsService from "../../services/ProductsService"
import PackagingService from "../../services/PackagingService"

export default function ProductsScreen({ route }) {
    const listRef = useRef(null)
    const [ openModal, setOpenModal ] = useState(false)
    const [ categories, setCategories ] = useState([])
    const [ packaging, setPackaging ] = useState([])

    useEffect(() => {
        getCategories()
        getPackaging()
    }, [])

    const getCategories = async () => {
        const res = await ProductsService.getCategories()

        if (res.success) {
            setCategories(res.categories)
        } else {    
            console.error(res.message)
        }
    }

    const getPackaging = async () => {
        const res = await PackagingService.getAll()

        if (res.success) {
            setPackaging(res.packaging)
        } else {    
            console.error(res.message)
        }
    }

    return (
        <>
        <View style={[styles.container]}>
            <View style={[styles.top]}>
                <Btn text="Створити"
                    onPress={() => setOpenModal(true)}/>
            </View>
            <View style={[styles.bottom]}>
                <ProductsList 
                    ref={listRef}
                    categoryId={route.params?.categoryId}
                    categories={categories}
                    packaging={packaging}/>
            </View>
        </View>
        
        <ProductModal
            visible={openModal}
            categoryId={route.params?.categoryId}
            categories={categories}
            packaging={packaging}
            onClose={() => setOpenModal(false)}
            created={() => listRef.current.refresh()}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
    },
    top: {
        paddingHorizontal: 16,
    },  
    bottom: {
        flex: 1,
    },
})