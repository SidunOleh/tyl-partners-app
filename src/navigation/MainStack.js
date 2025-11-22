import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainLayout from "../layouts/Main/Main"
import IncomeOrdersScreen from "../screens/Orders/Income"
import InWorkOrdersScreen from "../screens/Orders/InWork"
import DoneOrdersScreen from "../screens/Orders/Done"
import ChatScreen from "../screens/Chat/Chat"
import FullScreenLayout from "../layouts/FullScreen/FullScreen"
import CanceledOrdersScreen from "../screens/Orders/Canceled"
import NotificationsScreen from "../screens/Notifications/Notifications"
import CallCourierScreen from "../screens/CallCourier/CallCourier"
import InfoScreen from "../screens/Info/Info"
import StopListScreen from "../screens/StopList/StopList"
import ReportsScreen from "../screens/Reports/Reports"
import PackagingScreen from "../screens/Packaging/Packaging"
import CategoriesScreen from "../screens/Products/CategoriesScreen"
import ProductsScreen from "../screens/Products/ProductsScreen"

const Stack = createNativeStackNavigator()

export default function MainStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false, 
            animation: 'fade', 
            animationDuration: 200,
        }}>
            <Stack.Screen name="stop-list" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Стоп-лист">
                        <StopListScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="orders.income" >
                {props => (
                    <MainLayout title="Вхідні">
                        <IncomeOrdersScreen {...props}/>
                    </MainLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="orders.in-work">
                {props => (
                    <MainLayout title="В роботі">
                        <InWorkOrdersScreen {...props}/>
                    </MainLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="orders.done">
                {props => (
                    <MainLayout title="Виконані">
                        <DoneOrdersScreen {...props}/>
                    </MainLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="orders.canceled" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Скасовані">
                        <CanceledOrdersScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="chat">
                {props => (
                    <MainLayout title="Чат">
                        <ChatScreen {...props}/>
                    </MainLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="notifications" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Сповіщення">
                        <NotificationsScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="call-courier" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Виклик кур'єра">
                        <CallCourierScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="info" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Про заклад">
                        <InfoScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="reports" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Звіти">
                        <ReportsScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="packaging" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Пакування">
                        <PackagingScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="categories" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Категорії">
                        <CategoriesScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="products" options={{animation: 'slide_from_right',}}>
                {props => (
                    <FullScreenLayout title="Товари">
                        <ProductsScreen {...props}/>
                    </FullScreenLayout>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    )
}