import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const initState = {
  theme: "light",
}

export const useThemeStore = create() (
  persist(
    set => ({
        ...initState,
        change: theme => set({ 
            theme,
        }),
        reset: () => set(initState),
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)