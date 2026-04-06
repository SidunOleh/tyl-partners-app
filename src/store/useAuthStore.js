import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const initState = {
  user: null,
  token: null,
  isAuthenticated: false,
  pushToken: null,
}

export const useAuthStore = create() (
  persist(
    set => ({
        ...initState,
        login: token => set({ 
            token, 
            isAuthenticated: true,
        }),
        setUser: user => set({
            user,
        }),
        logout: () => set({ 
            user: null, 
            token: null,
            isAuthenticated: false,
        }),
        setPushToken: pushToken => set({
            pushToken,
        }),
        deletePushToken: () => set({
            pushToken: null,
        }),
        reset: () => set(initState),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)