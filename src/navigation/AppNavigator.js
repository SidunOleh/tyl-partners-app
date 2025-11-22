import { useAuthStore } from "../store/useAuthStore"
import AuthStack from "./AuthStack"
import MainStack from "./MainStack"

export default function AppNavigator() {
    const { isAuthenticated } = useAuthStore()

    return isAuthenticated ? <MainStack/> : <AuthStack/>
}