import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./src/navigation/AppNavigator"
import { useEffect, useState } from "react"
import { useAuthStore } from "./src/store/useAuthStore"
import NotificationsService from "./src/services/NotificationsService"
import EchoService from "./src/services/EchoService"
import { useNotificationsStore } from "./src/store/useNotificationsStore"
import { AppState } from "react-native"
import { useChatStore } from "./src/store/useChatStore"
import ChatService from "./src/services/ChatService"
import { createAudioPlayer } from 'expo-audio'
import { useOrdersStore } from "./src/store/useOrdersStore"
import { useProductsStore } from "./src/store/useProductsStore"
import { usePackagingStore } from "./src/store/usePackagingStore"
import { GestureHandlerRootView } from "react-native-gesture-handler"
const player = createAudioPlayer(require('./assets/audio/notification.mp3'))

export default function App() {
  const { isAuthenticated, user, } = useAuthStore()
  const [ appState, setAppState ] = useState(AppState.currentState)
  const { incrementCount, setNew } = useNotificationsStore()
  const { incrementCount: incrementChatCount } = useChatStore()

  useEffect(() => {
    if (! isAuthenticated) {
      EchoService.disconnect()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      let timer = null

      NotificationsService.listen(async data => {
        incrementCount()
        setNew(data)
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => setNew(null), 5000)
        player.seekTo(0)
        player.play()
      })
      NotificationsService.refreshUnreadCount()
    } else {
      NotificationsService.leave()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      ChatService.listen(data => {
        const message = data.message
        if (
            message.sender.id == user.id &&
            message.sender.type == "App\\Models\\Partner"
        ) {
            return
        }
        incrementChatCount()
      })
      ChatService.refreshUnreadTotal()
    } else {
      ChatService.leave()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const listener = AppState.addEventListener("change", nextAppState => {
        if (
            appState.match(/inactive|background/) 
            && nextAppState === "active"
        ) {
            NotificationsService.refreshUnreadCount()
            ChatService.refreshUnreadTotal()
        }

        setAppState(nextAppState)
    })

    return () => {
      listener.remove()
    }
  }, [appState])

  useEffect(() => {
      if (! isAuthenticated) {
        const authStore = useAuthStore.getState()
        authStore.reset()
        const notificationsStore = useNotificationsStore.getState()
        notificationsStore.reset()
        const chatStore = useChatStore.getState() 
        chatStore.reset()
        const ordersStore = useOrdersStore.getState() 
        ordersStore.reset()
        const productsStore = useProductsStore.getState()
        productsStore.reset()
        const packagingStore = usePackagingStore.getState()
        packagingStore.reset()
      }
  }, [isAuthenticated])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
