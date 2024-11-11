import { createAsyncThunk } from "@reduxjs/toolkit"
import { inAppWallet, InAppWalletAuth, smartWallet, Wallet } from "thirdweb/wallets"
import { baseSepolia } from "thirdweb/chains"
import { client } from "../utils/tokens"
import { managedAccountFactory } from "../config/thirdweb"

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
      clientId: "8ca2b38bb95e11e361cd5c813ffcfcf5",
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

   const Swallet = smartWallet({
      chain: baseSepolia,
      factoryAddress: managedAccountFactory,
      gasless: true,
      clientId: "8ca2b38bb95e11e361cd5c813ffcfcf5",
   })

   const smartAccount = await Swallet.connect({
      chain: baseSepolia,
      client,
      personalAccount,
   })

   return { personalAccount, smartAccount }
})
