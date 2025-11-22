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
import Dropdown from "../../UI/Select"

const iniState = {
    name: '',
    price: '',
    image: '',
    category_id: null,
    packaging_id: null,
    description: '',
    ingredients: '',
    weight: '',
}

export default function ProductModal({ visible, onClose, item, created, updated, categories, packaging, categoryId }) {
    const [ data, setData ] = useState({...iniState})
    const [ loading, setLoading ] = useState(false)
    const [ errors, setErrors ] = useState({})
    const [ error, setError ] = useState(null)
    const [ successMsg, setSuccessMsg ] = useState(null)
    const { theme } = useThemeStore()
    const [ packagingOptions, setPackagingOptions ] = useState([])
    const [ categoriesOptions, setCategoriesOptions ] = useState([])
    const modalRef = useRef(null)

    useEffect(() => {
        if (item) {
            setData({
                ...item,
                category_id: item.categories[1]?.id ?? null,
                packaging_id: item.packaging_products[0]?.id ?? null,
            })
        }
    }, [item])

    useEffect(() => {
        if (categoryId && ! item) {
            setData({...item, category_id: categoryId})
        }
    }, [categoryId, visible])

    useEffect(() => {
        setCategoriesOptions(categories.map(category => ({
            label: category.name,
            value: category.id,
        })))
    }, [categories])

    useEffect(() => {
        setPackagingOptions(packaging.map(item => ({
            label: item.name,
            value: item.id,
        })))
    }, [packaging])

    const create = async () => {
        setError(null)
        setErrors({})

        setLoading(true)
        const res = await ProductsService.createProduct(data)
        setLoading(false)
        if (res.success) {
            setData({...iniState})
            onClose()
            if (created) {
                created(res.product)
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
        const res = await ProductsService.updateProduct(item.id, data)
        setLoading(false)
        if (res.success) {
            setSuccessMsg('Успішно збережено')
            setTimeout(() => setSuccessMsg(null), 2000)
            if (updated) {
                updated(res.product)
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
        <CustomModal ref={modalRef} visible={visible} onClose={onClose}>
            <>
            <Text style={[styles.title, {color: css[theme].text}]}>
                {item ? `Редагувати ${item.name}` : 'Створити товар'}
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
                value={String(data.price ?? '')}
                setValue={price => setData({...data, price})}
                error={errors.price}
                label="Ціна"
                placeholder="Вкажіть ціну"
                keyboardType="numeric"
                returnKeyType="done"/>

            <Space/>

            <UploadImage
                value={data.image}
                setValue={image => setData({...data, image,})}
                label="Фото"
                error={errors.image}/>

            <Space/>

            <Dropdown
                selectedValue={data.category_id}
                options={categoriesOptions}
                label="Категорія"
                placeholder="Виберіть категорію"
                onValueChange={val => setData({...data, category_id: val,})}
                error={errors.category_id}/>

            <Space/>

            <Dropdown
                selectedValue={data.packaging_id}
                options={packagingOptions}
                label="Пакування"
                placeholder="Виберіть пакування"
                onValueChange={val => setData({...data, packaging_id: val,})}
                error={errors.packaging_id}/>

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

             <Input
                value={data.ingredients}
                setValue={ingredients => setData({...data, ingredients,})}
                error={errors.ingredients}
                label="Інгредієнти"
                placeholder="Вкажіть інгредієнти"
                multiline={true}
                style={{
                    minHeight: 120,
                    textAlignVertical: 'top',
                }}/>

            <Space/>

            <Input
                value={data.weight}
                setValue={weight => setData({...data, weight,})}
                error={errors.weight}
                label="Вага"
                placeholder="Вкажіть вагу"/>

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