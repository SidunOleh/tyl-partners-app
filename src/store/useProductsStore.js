import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const initState = {
    products: [],
    stopList: [],
    categories: [],
    categoryProducts: {},
}

export const useProductsStore = create() (
  persist(
    set => ({
        ...initState,
        setProducts: products => set({
            products,
        }),
        setStopList: stopList => set({ 
            stopList,
        }),
        addToStopList: item => set(state => ({
          stopList: [item, ...state.stopList],
        })),
        removeFromStopList: item => set(state => ({
          stopList: state.stopList.filter(product => product.id != item.id)
        })),
        setCategories: categories => set({
          categories,
        }), 
        setCategoryProducts: (catId, data) => set(state => ({
          categoryProducts: {
            ...state.categoryProducts,
            [catId]: data, 
          },
        })),
        reset: () => set(initState),
    }),
    {
      name: "products-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)