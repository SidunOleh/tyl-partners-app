import { StyleSheet, Text, } from "react-native"
import CustomModal from "../../UI/Modal"
import { useEffect, useRef, useState } from "react"
import Error from "../../UI/Error"
import Success from "../../UI/Success"
import Input from "../../UI/Input"
import Space from "../../UI/Space"
import Btn from "../../UI/Btn"
import css from "../../../styles/css"
import { useThemeStore } from "../../../store/useThemeStore"
import ProductsService from "../../../services/ProductsService"
import UploadImage from "../../UI/UploadImage"
import CustomSwitch from "../../UI/Switch"
import slugify from "slugify"

const iniState = {
    name: '',
    slug: '',
    image: '',
    description: '',
    visible: false,
}

export default function CategoryModal({ visible, onClose, item, created, updated }) {
    const [ data, setData ] = useState({...iniState})
    const [ loading, setLoading ] = useState(false)
    const [ errors, setErrors ] = useState({})
    const [ error, setError ] = useState(null)
    const [ successMsg, setSuccessMsg ] = useState(null)
    const { theme } = useThemeStore()
    const modalRef = useRef(null)

    useEffect(() => {
        if (item) {
            setData({...item})
        }
    }, [item])

    useEffect(() => {
        setData(prev => ({...prev, slug: slugify(data.name)}))
    }, [data.name])

    const create = async () => {
        setError(null)
        setErrors({})

        setLoading(true)
        const res = await ProductsService.createCategory(data)
        setLoading(false)
        if (res.success) {
            setData({...iniState})
            onClose()
            if (created) {
                created(res.category)
            }
        } else {
            if (res.status == 422) {
                setErrors(res.errors)
            } else {
                setError(res.message)
            }
        }
        modalRef.current.scrollTop()
    }

    const update = async () => {
        setError(null)
        setErrors({})

        setLoading(true)
        const res = await ProductsService.updateCategory(item.id, data)
        setLoading(false)
        if (res.success) {
            setSuccessMsg('Успішно збережено')
            setTimeout(() => setSuccessMsg(null), 2000)
            if (updated) {
                updated(res.category)
            }
        } else {
            if (res.status == 422) {
                setErrors(res.errors)
            } else {
                setError(res.message)
            }
        }
        modalRef.current.scrollTop()
    }

    return (
        <CustomModal 
            visible={visible} 
            onClose={onClose}
            ref={modalRef}>
            <>
            <Text style={[styles.title, {color: css[theme].text}]}>
                {item ? `Редагувати ${item.name}` : 'Створити категорію'}
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
                value={data.slug}
                setValue={slug => setData({...data, slug,})}
                error={errors.slug}
                label="Слаг"
                placeholder="Вкажіть слаг"/>

            <Space/>

            <UploadImage
                value={data.image}
                setValue={image => setData({...data, image,})}
                label="Фото"
                error={errors.image}/>

            <Space/>

            <Input
                value={data.description}
                setValue={description => setData({...data, description,})}
                error={errors.description}
                label="Опис"
                placeholder="Вкажіть опис"
                multiline={true}
                style={{
                    minHeight: 120,
                    textAlignVertical: 'top',
                }}/>

            <Space/>

            <CustomSwitch
                value={Boolean(data.visible)}
                setValue={visible => setData({...data, visible,})}
                label="Видимість"
                error={errors.visible}/>

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