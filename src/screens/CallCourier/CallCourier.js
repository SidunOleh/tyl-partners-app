import { StyleSheet, View } from "react-native"
import Btn from "../../components/UI/Btn"
import { useRef, useState } from "react"
import CallCourierModal from "../../components/CallCourier/Modal"
import CallCourierList from "../../components/CallCourier/List"

export default function CallCourierScreen() {
    const [ showModal, setShowModal ] = useState(false) 
    const listRef = useRef(null)

    return (
        <>
        <View style={[styles.container]}>
            <View style={[styles.top]}>
                <Btn 
                    text="Викликати"
                    onPress={() => setShowModal(true)}/>
            </View>
            <View style={[styles.bottom]}>
                <CallCourierList ref={listRef}/>
            </View>
        </View>

        <CallCourierModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onCreate={() => listRef.current?.refresh()}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    bottom: {
        flex: 1,
    },
})