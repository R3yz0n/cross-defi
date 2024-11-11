// src/store/slices/walletSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { connectPersonalWallet, connectSmartWallet, reHydrateAccounts } from "./walletThunk"
import { Account, inAppWallet, smartWallet } from "thirdweb/wallets"
import { baseSepolia } from "thirdweb/chains"

import { createThirdwebClient, ThirdwebClient } from "thirdweb"
import { managedAccountFactory } from "../config/thirdweb"

export const client: ThirdwebClient = createThirdwebClient({
   clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
   //    secretKey: import.meta.env.VITE_SECRET_KEY,
})

export const personalWallet = inAppWallet()

export interface ITokenState {
   walletAddress: string | null
   isConnectingPersonalWallet: boolean
   isConnectingSmartWallet: boolean
   personalAccount: Account | null
   smartAccount: Account | null
   connectionError: string | null
   connectorId: string | null
}

// Function to load state from localStorage
const loadStateFromLocalStorage = (): ITokenState => {
   const walletAddress = localStorage.getItem("walletAddress")
   const personalAccount = localStorage.getItem("personalAccount")
   const smartAccount = localStorage.getItem("smartAccount")
   const connectorId = localStorage.getItem("connectorId")

   return {
      walletAddress: walletAddress ? JSON.parse(walletAddress) : null,
      isConnectingPersonalWallet: false,
      isConnectingSmartWallet: false,
      personalAccount: personalAccount ? JSON.parse(personalAccount) : null,
      smartAccount: smartAccount ? JSON.parse(smartAccount) : null,
      connectionError: null,
      connectorId: connectorId ? JSON.parse(connectorId) : null,
   }
}

const initialState: ITokenState = loadStateFromLocalStorage()

export const walletSlice = createSlice({
   name: "wallet",
   initialState,
   reducers: {
      addWalletAddress: (state, action: PayloadAction<string>) => {
         state.walletAddress = action.payload

         localStorage.setItem("walletAddress", JSON.stringify(action.payload))
      },
      removeWalletAddress: (state) => {
         state.walletAddress = null
         state.personalAccount = null
         state.smartAccount = null

         // Clear wallet data from localStorage
         localStorage.removeItem("walletAddress")
         localStorage.removeItem("personalAccount")
         localStorage.removeItem("smartAccount")
         localStorage.removeItem("connectorId")
      },
      addConnectorId: (state, action: PayloadAction<string>) => {
         state.connectorId = action.payload
         localStorage.setItem("connectorId", JSON.stringify(action.payload))
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
            state.walletAddress = action.payload.address
            state.isConnectingPersonalWallet = false

            // Persist personal account and wallet address

            localStorage.setItem("personalAccount", JSON.stringify(state.personalAccount))
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

            // Persist smart account
            localStorage.setItem("walletAddress", JSON.stringify(state.walletAddress))
            localStorage.setItem("smartAccount", JSON.stringify(state.smartAccount))
         })
         .addCase(connectSmartWallet.rejected, (state, action) => {
            state.isConnectingSmartWallet = false
            state.connectionError = action.error.message || "Failed to connect smart wallet"
         })

      builder
         .addCase(reHydrateAccounts.pending, (state) => {
            state.connectionError = null
         })
         .addCase(reHydrateAccounts.fulfilled, (state, action) => {
            state.smartAccount = action.payload.smartAccount
            state.personalAccount = action.payload.personalAccount
            state.isConnectingSmartWallet = false

            localStorage.setItem("walletAddress", JSON.stringify(state.walletAddress))
            localStorage.setItem("smartAccount", JSON.stringify(state.smartAccount))
         })
         .addCase(reHydrateAccounts.rejected, (state, action) => {
            state.isConnectingSmartWallet = false
            state.connectionError = action.error.message || "Failed to connect smart wallet"
         })
   },
})

export const { addWalletAddress, removeWalletAddress, addConnectorId } = walletSlice.actions
export default walletSlice.reducer
