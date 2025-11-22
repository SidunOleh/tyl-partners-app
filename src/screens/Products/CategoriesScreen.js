import { StyleSheet, View } from "react-native"
import Btn from "../../components/UI/Btn"
import CategoriesList from "../../components/Products/Categories/List"
import { useRef, useState } from "react"
import CategoryModal from "../../components/Products/Categories/Modal"

export default function CategoriesScreen() {
    const listRef = useRef(null)
    const [ openModal, setOpenModal ] = useState(false)

    return (
        <>
        <View style={[styles.container]}>
            <View style={[styles.top]}>
                <Btn text="Створити"
                    onPress={() => setOpenModal(true)}/>
            </View>
            <View style={[styles.bottom]}>
                <CategoriesList ref={listRef}/>
            </View>
        </View>
        
        <CategoryModal
            visible={openModal}
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