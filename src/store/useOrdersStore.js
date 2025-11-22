import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const initState = {
    incomeOrders: [],
    inWorkOrders: [],
    doneOrders: [],
    canceledOrders: [],
    courierOrders: [],
}

export const useOrdersStore = create() (
  persist(
    set => ({
        ...initState,
        setIncomeOrders: data => set({
            incomeOrders: data,
        }),
        setInWorkOrders: data => set({
            inWorkOrders: data,
        }),
        setDoneOrders: data => set({
            doneOrders: data,
        }),
        setCanceledOrders: data => set({
            canceledOrders: data,
        }),
        setCourierOrders: data => set({
          courierOrders: data,
        }),
        reset: () => set(initState),
    }),
    {
      name: "orders-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)