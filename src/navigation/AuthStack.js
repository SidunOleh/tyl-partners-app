import { createNativeStackNavigator } from "@react-navigation/native-stack"
import FullScreenLayout from "../layouts/FullScreen/FullScreen"
import LoginScreen from "../screens/Auth/Login"

const Stack = createNativeStackNavigator()

export default function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login">
                {props =>  (
                    <FullScreenLayout title="Вхід" arrow={false}>
                        <LoginScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    )
}