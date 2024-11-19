import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseSepolia } from "thirdweb/chains"
import { inAppWallet, smartWallet, Wallet } from "thirdweb/wallets"
import { managedAccountFactory } from "../config/thirdweb"
import { client } from "../utils/tokens"

export const personalWallet: Wallet = inAppWallet()

interface ConnectPersonalWalletPayload {
   connector: any
}

interface ConnectSmartWalletPayload {
   personalAccount: any
}

// Thunk for connecting to the personal wallet
export const connectPersonalWallet = createAsyncThunk("wallet/connectPersonalWallet", async ({ connector }: ConnectPersonalWalletPayload) => {
   const personalAccount = await personalWallet.connect({
      strategy: "wallet",
      chain: baseSepolia,
      wallet: connector,
      client,
   })

   return personalAccount
})

// Thunk for connecting to the smart wallet
export const connectSmartWallet = createAsyncThunk("wallet/connectSmartWallet", async ({ personalAccount }: ConnectSmartWalletPayload) => {
   const Swallet = smartWallet({
      chain: baseSepolia,
      factoryAddress: managedAccountFactory,
      gasless: true,
      clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
   })

   const smartAccount = await Swallet.connect({
      chain: baseSepolia,
      client,
      personalAccount,
   })

   return smartAccount
})

// Thunk for connecting to the smart wallet
export const reHydrateAccounts = createAsyncThunk("wallet/rehydration", async () => {
   const personalAccount = await personalWallet.autoConnect({ client, chain: baseSepolia })
   console.log(personalAccount)

   const Swallet = smartWallet({
      chain: baseSepolia,
      factoryAddress: managedAccountFactory,
      gasless: true,
      clientId: import.meta.env.fVITE_THIRD_WEB_CLIENT_ID,
   })

   const smartAccount = await Swallet.connect({
      chain: baseSepolia,
      client,
      personalAccount,
   })
   return { personalAccount, smartAccount }
})
