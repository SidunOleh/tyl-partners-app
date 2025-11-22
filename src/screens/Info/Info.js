import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native"
import InfoService from "../../services/InfoService"
import Input from "../../components/UI/Input"
import AddressInput from "../../components/UI/AddressInput"
import Space from "../../components/UI/Space"
import Btn from "../../components/UI/Btn"
import { useThemeStore } from "../../store/useThemeStore"
import { formatPhone } from "../../utils/utils"
import CustomSwitch from "../../components/UI/Switch"
import UploadImage from "../../components/UI/UploadImage"
import Schedule from "../../components/UI/Schedule"
import Error from "../../components/UI/Error"
import Success from "../../components/UI/Success"

export default function InfoScreen() {
    const { theme } = useThemeStore()
    const [ data, setData ] = useState({})
    const [ error, setError ] = useState(null)
    const [ errors, setErrors ] = useState({})
    const [ loading, setLoading ] = useState(false)
    const [ loadingData, setLoadingData ] = useState(false)
    const [ successMsg, setSuccessMsg ] = useState(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLoadingData(true)
        const res = await InfoService.get()
        setLoadingData(false)

        if (res.success) {
            setData(res.data)
        }
    }

    const save = async () => {
        setError(null)
        setErrors({})
        setSuccessMsg(null)

        setLoading(true)
        const res = await InfoService.update(data)
        setLoading(false)

        if (! res.success) {            
            if (res.status == 422) {
                setErrors(res.errors)
            } else {
                setError(res.message)
            }
        } else {
            setSuccessMsg('Успішно збережено.')
            setTimeout(() => setSuccessMsg(null), 2000)
        }
        
        scrollRef.current?.scrollTo({ y: 0, animated: true })
    }

    return (
        <>
        {loadingData && <View style={styles.refreshIndicator}>
            <ActivityIndicator size="small" color={'#EC1220'} />
        </View>}

        <ScrollView 
            style={[{paddingHorizontal: 16,}]} 
            keyboardShouldPersistTaps={"always"}
            ref={scrollRef}>
            <View style={[styles.container, {backgroundColor: theme == "dark" ? "#272727" : "#FFFFFF",}]} >
                {error ? <Error text={error} css={{marginBottom: 10}}/> : null}

                {successMsg ? <Success text={successMsg} css={{marginBottom: 10}}/> : null}

                <Input
                    value={data.phone}
                    setValue={phone => setData({...data, phone: formatPhone(phone)})}
                    error={errors.phone}
                    label="Телефон"
                    placeholder="Введіть номер"
                    keyboardType="phone-pad"
                    maxLength={15}
                    returnKeyType="done"/>

                <Space/>

                <Input
                    value={data.name}
                    setValue={name => setData({...data, name,})}
                    error={errors.name}
                    label="Назва"
                    placeholder="Вкажіть назву"/>

                <Space/>

                <UploadImage
                    label="Фото"
                    value={data.image}
                    setValue={image => setData({...data, image,})}
                    error={errors.image}/>

                <Space/>

                <AddressInput
                    address={data.address} 
                    setAddress={address => setData({...data, address: {...address}})}
                    error={[...(errors['address.address'] ?? [])]}/>

                <Space/>

                <Schedule 
                    label="Графік"
                    value={data.schedule}
                    setValue={schedule => setData({...data, schedule,})}
                    errors={errors}/>

                <Space/>

                <CustomSwitch
                    label="Відкрито"
                    value={data.open}
                    setValue={open => setData({...data, open})}/>

                <Space/>

                <Btn text="Зберегти"
                    onPress={save}
                    disabled={loadingData || loading}/>
            </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
    },
    refreshIndicator: {
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
})