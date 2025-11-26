import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./src/navigation/AppNavigator"
import { useEffect, useRef, useState } from "react"
import { useAuthStore } from "./src/store/useAuthStore"
import NotificationsService from "./src/services/NotificationsService"
import EchoService from "./src/services/EchoService"
import { useNotificationsStore } from "./src/store/useNotificationsStore"
import { AppState, Vibration } from "react-native"
import { useChatStore } from "./src/store/useChatStore"
import ChatService from "./src/services/ChatService"
import { useOrdersStore } from "./src/store/useOrdersStore"
import { useProductsStore } from "./src/store/useProductsStore"
import { usePackagingStore } from "./src/store/usePackagingStore"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { playSound } from "./src/utils/utils"

export default function App() {
  const { isAuthenticated, user, } = useAuthStore()
  const [ appState, setAppState ] = useState(AppState.currentState)
  const { incrementCount, setNew } = useNotificationsStore()
  const { incrementCount: incrementChatCount } = useChatStore()
  const navRef = useRef(null)

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
        playSound()
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

        const currentRoute = navRef.current?.getCurrentRoute()
        if (currentRoute && currentRoute.name != "chat") {
          Vibration.vibrate(2000)
        }
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
        useAuthStore
          .getState()
          .reset()
        useNotificationsStore
          .getState()
          .reset()
        useChatStore
          .getState()
          .reset() 
        useOrdersStore
          .getState()
          .reset() 
        useProductsStore
          .getState()
          .reset()
        usePackagingStore
          .getState()
          .reset()
      }
  }, [isAuthenticated])

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={navRef}>
        <AppNavigator/>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
