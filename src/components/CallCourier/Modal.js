import { useState } from "react"
import css from "../../styles/css"
import Btn from "../UI/Btn"
import { StyleSheet, Text, } from "react-native"
import CustomModal from "../UI/Modal"
import { useThemeStore } from "../../store/useThemeStore"
import Input from "../UI/Input"
import { formatPhone } from "../../utils/utils"
import OrdersService from "../../services/OrdersService"
import Space from "../UI/Space"
import AddressInput from "../UI/AddressInput"
import Error from "../UI/Error"

const iniData = {
    address: {
        address: '',
        lat: null,
        lng: null,
    },
    phone: '',
    comment: '',
}

export default function CallCourierModal({ visible, onClose, onCreate }) {
    const { theme } = useThemeStore()
    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState({...iniData})
    const [ errors, setErrors ] = useState({})
    const [ error, setError ] = useState(null)

    async function createCall() {
        setError(null)
        setErrors({})

        setLoading(true)
        const res = await OrdersService.createCourierOrder(data)
        setLoading(false)
        
        if (res.success) {
            setData({...iniData})
            onCreate()
            onClose()
        } else {
            if (res.status == 422) {
                setErrors(res.errors)
            } else {
                setError(res.message)
            }
        }
    }

    return (
        <CustomModal visible={visible} onClose={onClose}>
            <>
            <Text style={[styles.title, {color: css[theme].text}]}>
                Виклик кур'єра
            </Text>

            {error ? <Error text={error} css={{marginBottom: 10}}/> : null}

            <AddressInput 
                address={data.address} 
                setAddress={address => setData({...data, address: {...address}})}
                error={[...(errors['address.address'] ?? [])]}/>

            <Space px={10}/>

            <Input
                value={data.phone}
                setValue={phone => setData({...data, phone: formatPhone(phone)})}
                error={errors.phone}
                label="Телефон"
                placeholder="Введіть номер"
                keyboardType="phone-pad"
                maxLength={15}
                returnKeyType="done"/>

            <Space px={10}/>

            <Input
                value={data.comment}
                setValue={comment => setData({...data, comment,})}
                error={errors.comment}
                label="Коментар / особливі інструкції"
                placeholder="Вкажіть коментар"
                multiline
                style={{
                    minHeight: 120,
                    textAlignVertical: 'top',
                }}/>

            <Btn
                text="Надіслати" 
                css={[{marginTop: 10,}]}
                onPress={createCall}
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
