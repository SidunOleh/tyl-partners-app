import { StyleSheet, View } from "react-native"
import Btn from "../../components/UI/Btn"
import PackagingList from "../../components/Packaging/List"
import { useRef, useState } from "react"
import PackagingModal from "../../components/Packaging/Modal"

export default function PackagingScreen() {
    const listRef = useRef(null)
    const [ openModal, setOpenModal ] = useState(false)

    return (
        <>
        <View style={[styles.container]}>
            <View style={[styles.top]}>
                <Btn 
                    text="Створити"
                    onPress={() => setOpenModal(true)}/>
            </View>
            <View style={[styles.bottom]}>
                <PackagingList ref={listRef}/>
            </View>
        </View>
        
        <PackagingModal
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