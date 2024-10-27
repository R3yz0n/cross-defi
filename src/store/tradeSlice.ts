// store/slices/tradeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TradeType = "market" | "limit" | "trigger"
export type OrderType = "buy" | "sell"

interface OrderState {
   selectedTrade: TradeType
   orderType: OrderType
   isOrderPlaced: boolean
}

const initialState: OrderState = {
   selectedTrade: "limit",
   orderType: "buy",
   isOrderPlaced: false,
}

const tradeSlice = createSlice({
   name: "trade",
   initialState,
   reducers: {
      setTab: (state, action: PayloadAction<TradeType>) => {
         state.selectedTrade = action.payload
      },
      setOrderType: (state, action: PayloadAction<OrderType>) => {
         state.orderType = action.payload
      },
      setOrderPlaced: (state, action: PayloadAction<boolean>) => {
         state.isOrderPlaced = action.payload
      },
   },
})

export const { setTab, setOrderType, setOrderPlaced } = tradeSlice.actions
export default tradeSlice.reducer
