import { configureStore } from "@reduxjs/toolkit"
import tokenSlice from "./tokenSlice"
import tradeSlice from "./tradeSlice"

export const store = configureStore({
   reducer: {
      trade: tradeSlice,
      token: tokenSlice,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
