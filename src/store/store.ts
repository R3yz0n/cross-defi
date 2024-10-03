import { configureStore } from "@reduxjs/toolkit"
import tokenSlice from "./tokenSlice"
import tradeSlice from "./tradeSlice"
import walletSlice from "./walletSlice"

export const store = configureStore({
   reducer: {
      trade: tradeSlice,
      token: tokenSlice,
      wallet: walletSlice,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
