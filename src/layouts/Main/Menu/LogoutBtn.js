import { useState } from "react"
import AuthService from "../../../services/AuthService"
import StrokeBtn from "../../../components/UI/StrokeBtn"

export default function LogoutBnt() {
    const [loading, setLoading] = useState(false)

    const logOut = async () => {
        setLoading(true)
        const res = await AuthService.logout()
        setLoading(false)
    }

    return (
        <StrokeBtn onPress={logOut} disabled={loading} text="Вихід"/>
    )
}