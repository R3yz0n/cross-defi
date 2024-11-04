// src/store/slices/walletSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { connectPersonalWallet, connectSmartWallet } from "./walletThunk"

export interface ITokenState {
   walletAddress: string | null
   isConnectingPersonalWallet: boolean
   isConnectingSmartWallet: boolean
   personalAccount: any | null
   smartAccount: any | null
   connectionError: string | null
}

const initialState: ITokenState = {
   walletAddress: null,
   isConnectingPersonalWallet: false,
   isConnectingSmartWallet: false,
   personalAccount: null,
   smartAccount: null,
   connectionError: null,
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
         state.personalAccount = null
         state.smartAccount = null
      },
   },
   extraReducers: (builder) => {
      // Handle connectPersonalWallet thunk
      builder
         .addCase(connectPersonalWallet.pending, (state) => {
            state.isConnectingPersonalWallet = true
            state.connectionError = null
         })
         .addCase(connectPersonalWallet.fulfilled, (state, action) => {
            state.personalAccount = action.payload
            state.walletAddress = action.payload.address // Assuming personalAccount has an `address` property
            state.isConnectingPersonalWallet = false
         })
         .addCase(connectPersonalWallet.rejected, (state, action) => {
            state.isConnectingPersonalWallet = false
            state.connectionError = action.error.message || "Failed to connect personal wallet"
         })

      // Handle connectSmartWallet thunk
      builder
         .addCase(connectSmartWallet.pending, (state) => {
            state.isConnectingSmartWallet = true
            state.connectionError = null
         })
         .addCase(connectSmartWallet.fulfilled, (state, action) => {
            state.smartAccount = action.payload
            state.isConnectingSmartWallet = false
         })
         .addCase(connectSmartWallet.rejected, (state, action) => {
            state.isConnectingSmartWallet = false
            state.connectionError = action.error.message || "Failed to connect smart wallet"
         })
   },
})

// Export actions and reducer
export const { addWalletAddress, removeWalletAddress } = walletSlice.actions
export default walletSlice.reducer
