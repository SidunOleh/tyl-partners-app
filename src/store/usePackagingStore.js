import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const initState = {
  data: [],
}

export const usePackagingStore = create() (
  persist(
    set => ({
        ...initState,
        setData: data => set({
            data,
        }),
        reset: () => set(initState),
    }),
    {
      name: "packaging-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)