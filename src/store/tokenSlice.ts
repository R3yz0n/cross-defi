import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { tokens } from "../utils/tokens"

export interface ITokenType {
   id: number
   name: string
   symbol: string
   price_usd: number
   price_increase_24h_percent: number
   logo_url: string
   address: string
   priceAggregator?: string
   decimal: number
}

export interface ITokenState {
   tokens: ITokenType[]
   selectedTokenInSideBar: ITokenType | null
   //   other datas
}

const initialState: ITokenState = {
   tokens: tokens,
   selectedTokenInSideBar: null,
   //   other datas
}

// Create the tokenSlice
export const tokenSlice = createSlice({
   name: "token",
   initialState,
   reducers: {
      selectTokenInSideBar: (state, action: PayloadAction<number>) => {
         state.selectedTokenInSideBar = state.tokens.find((token) => token.id === action.payload) || null
      },
      searchTokenInSideBar: (state, action: PayloadAction<string>) => {
         const searchTerm = action.payload.toUpperCase() // Make search case-insensitive

         state.tokens = initialState.tokens.filter((token) => token.symbol.includes(searchTerm))
      },
   },
})

// Export actions and reducer
export const { selectTokenInSideBar, searchTokenInSideBar } = tokenSlice.actions
export default tokenSlice.reducer
