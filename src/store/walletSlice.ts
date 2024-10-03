import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ITokenState {
   walletAddress: string | null
}

const initialState: ITokenState = {
   walletAddress: null,
}

// Create the walletSlice
export const walletSlice = createSlice({
   name: "wallet",
   initialState,
   reducers: {
      addWalletAddress: (state, action: PayloadAction<string>) => {
         state.walletAddress = action.payload
      },
      removeWalletAddress: (state) => {
         state.walletAddress = null
      },
   },
})

// Export actions and reducer
export const { addWalletAddress, removeWalletAddress } = walletSlice.actions
export default walletSlice.reducer
