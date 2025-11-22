import { StyleSheet, Text, } from "react-native"
import CustomModal from "../UI/Modal"
import { useEffect, useState } from "react"
import PackagingService from "../../services/PackagingService"
import Error from "../UI/Error"
import Success from "../UI/Success"
import Input from "../UI/Input"
import Space from "../UI/Space"
import Btn from "../UI/Btn"
import css from "../../styles/css"
import { useThemeStore } from "../../store/useThemeStore"

export default function PackagingModal({ visible, onClose, item, created, updated }) {
    const [ data, setData ] = useState({
        name: '',
        price: '',
    })
    const [ loading, setLoading ] = useState(false)
    const [ errors, setErrors ] = useState({})
    const [ error, setError ] = useState(null)
    const [ successMsg, setSuccessMsg ] = useState(null)
    const { theme } = useThemeStore()

    useEffect(() => {
        if (item) {
            setData({
                name: item.name,
                price: String(item.price),
            })
        }
    }, [item])

    const create = async () => {
        setError(null)
        setErrors({})

        setLoading(true)
        const res = await PackagingService.create(data)
        setLoading(false)
        if (res.success) {
            setData({
                name: '',
                price: '',
            })
            onClose()
            if (created) {
                created(res.data)
            }
        } else {
            if (res.status == 422) {
                setErrors(res.errors)
            } else {
                setError(res.message)
            }
        }
    }

    const update = async () => {
        setError(null)
        setErrors({})

        setLoading(true)
        const res = await PackagingService.update(item.id, data)
        setLoading(false)
        if (res.success) {
            setSuccessMsg('Успішно збережено')
            setTimeout(() => setSuccessMsg(null), 2000)
            if (updated) {
                updated(res.data)
            }
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
                {item ? `Редагувати ${item.name}` : 'Створити пакування'}
            </Text>

            {error && <Error text={error} css={{marginBottom: 10}}/>}

            {successMsg && <Success text={successMsg} css={{marginBottom: 10}}/>}

            <Input
                value={data.name}
                setValue={name => setData({...data, name,})}
                error={errors.name}
                label="Назва"
                placeholder="Вкажіть назву"/>

            <Space/>

            <Input
                value={data.price}
                setValue={price => setData({...data, price})}
                error={errors.price}
                label="Ціна"
                placeholder="Вкажіть ціну"
                keyboardType="numeric"
                returnKeyType="done"/>

            <Space/>

            <Btn text="Зберегти"
                onPress={item ? update : create}
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