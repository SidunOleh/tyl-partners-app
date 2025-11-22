import { useState } from "react"
import Btn from "../../UI/Btn"
import { StyleSheet, } from "react-native"
import CustomModal from "../../UI/Modal"
import OrdersService from "../../../services/OrdersService"
import Input from "../../UI/Input"

export default function DeclineModal({ item, visible, onClose, declined }) {
    const [ loading, setLoading ] = useState(false)
    const [ comment, setComment] = useState('')
    const [ error, setError ] = useState("")

    const onDecline = async () => {
        setLoading(true)
        const res = await OrdersService.declineOrder(item.id, {
            comment, 
        })
        setLoading(false)

        if (res.success) {
            declined()
            onClose()
        } else {
            setError(res.message)
        }
    }

    return (
        <CustomModal visible={visible} onClose={onClose}>
            <>
            <Input
                value={comment}
                setValue={setComment}
                error={error}
                label="Причина відхилення"
                placeholder="Вкажіть причину відхилення"
                multiline={true}
                style={{
                    minHeight: 120,
                    textAlignVertical: 'top',
                }}/>

            <Btn
                text="Відхилити" 
                css={[{marginTop: 10,}]}
                onPress={onDecline}
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
