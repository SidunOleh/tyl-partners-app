import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const initState = {
  count: 0,
  data: [],
}

export const useChatStore = create() (
  persist(
    set => ({
        ...initState,
        changeCount: count => set({ 
            count,
        }),
        incrementCount: () => set((state) => ({
          count: state.count + 1,
        })),
        setData: data => set({
            data,
        }),
        reset: () => set(initState),
    }),
    {
      name: "chat-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)