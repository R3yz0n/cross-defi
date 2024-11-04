import { configureStore } from "@reduxjs/toolkit"
import tokenSlice from "./tokenSlice"
import tradeSlice from "./tradeSlice"
import walletSlice from "./walletSlice"
import userSlice from "./userDetails"

export const store = configureStore({
   reducer: {
      trade: tradeSlice,
      token: tokenSlice,
      wallet: walletSlice,
      userDetails: userSlice,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
