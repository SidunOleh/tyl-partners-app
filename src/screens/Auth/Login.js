import { useState, } from "react"
import { StyleSheet, View, } from "react-native"
import AuthService from "../../services/AuthService"
import Btn from "../../components/UI/Btn"
import Input from "../../components/UI/Input"
import { formatPhone } from "../../utils/utils"

export default function LoginScreen() {
    const [ phone, setPhone ] = useState("")
    const [ phoneError, setPhoneError ] = useState(false)
    const [ codeSent, setCodeSent ] = useState(false)
    const [ code, setCode] = useState("")
    const [ codeError, setCodeError ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handlePhoneChange = phone => {
        setPhone(formatPhone(phone))
        if (phoneError) {
            setPhoneError(false)
        }
    }

    const handleSendCode = async () => {
        setLoading(true)
        const result = await AuthService.sendCode(phone)
        setLoading(false)
        if (!result.success) {
            setPhoneError(result.message)
        } else {
            setCodeSent(true)
        }
    }

    const handleCodeChange = code => {
        setCode(code)
        if (codeError) {
            setCodeError(false)
        }
    }

    const handleLogin = async () => {
        setLoading(true)
        const result = await AuthService.login(code)
        setLoading(false)

        if (! result.success) {
            setCodeError(result.message)
        }
    }

    return (
        <View style={{flex: 1, paddingHorizontal: 16,}}>
            {!codeSent 
                ? <Input
                    placeholder="Введіть номер телефону"
                    value={phone}
                    setValue={handlePhoneChange}
                    error={phoneError}
                    keyboardType="phone-pad"
                    maxLength={15}
                    returnKeyType="done"/> 
                : <Input
                    placeholder="Введіть код"
                    value={code}
                    setValue={handleCodeChange}
                    error={codeError}
                    keyboardType="phone-pad"
                    maxLength={6}
                    returnKeyType="done"/>}

            {!codeSent 
                ? <Btn 
                    text={"Отримати код"} 
                    onPress={handleSendCode} 
                    disabled={loading} 
                    css={styles.btn}/> 
                : <Btn 
                    text={"Вхід"} 
                    onPress={handleLogin} 
                    disabled={loading} 
                    css={styles.btn}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        padding: 20, 
    },
    input: { 
        marginBottom: 5,
    },
    btn: {
        marginTop: 28,
    },
})
