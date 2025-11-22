import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const initState = {
    count: 0,
    newNotification: null,
    data: [],
}

export const useNotificationsStore = create() (
  persist(
    set => ({
        ...initState,
        changeCount: count => set({ 
            count: Number(count),
        }),
        incrementCount: () => set((state) => ({
          count: state.count + 1,
        })),
        setNew: newNotification => set({
            newNotification,
        }),
        setData: data => set({
            data,
        }),
        reset: () => set(initState),
    }),
    {
      name: "notifications-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)