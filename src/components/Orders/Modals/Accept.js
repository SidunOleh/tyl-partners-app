import { useState } from "react"
import Btn from "../../UI/Btn"
import { StyleSheet, } from "react-native"
import CustomModal from "../../UI/Modal"
import OrdersService from "../../../services/OrdersService"
import Input from "../../UI/Input"

export default function AcceptModal({ item, visible, onClose, accepted }) {
    const [ loading, setLoading ] = useState(false)
    const [ cookingTime, setCookingTime] = useState(null)
    const [ error, setError ] = useState("")

    const onAccept = async () => {
        setLoading(true)
        const res = await OrdersService.acceptOrder(item.id, {
            cooking_time: cookingTime, 
        })
        setLoading(false)

        if (res.success) {
            accepted()
            onClose()
        } else {
            setError(res.message)
        }
    }

    return (
        <CustomModal visible={visible} onClose={onClose}>
            <>
            <Input
                value={cookingTime}
                setValue={setCookingTime}
                error={error}
                label="Час приготування"
                placeholder="Вкажіть час в хвилинах"
                keyboardType="numeric"
                returnKeyType="done"/>

            <Btn
                text="Прийняти" 
                css={[{marginTop: 10,}]}
                onPress={onAccept}
                disabled={loading}/>
            </>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 20,
        textAlign: "center",
        textTransform: "uppercase",
        marginHorizontal: "auto",
    },
})
