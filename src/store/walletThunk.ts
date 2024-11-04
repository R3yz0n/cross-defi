// src/store/thunks/walletThunks.ts

import { createAsyncThunk } from "@reduxjs/toolkit"
import { inAppWallet, smartWallet } from "thirdweb/wallets"
import { baseSepolia } from "thirdweb/chains"
import { client } from "../utils/tokens"
import { managedAccountFactory } from "../config/thirdweb"

const personalWallet: any = inAppWallet()

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
      clientId: "485a0fd95563acb5d9b22ab679e13022",
   })

   const smartAccount = await Swallet.connect({
      chain: baseSepolia,
      client,
      personalAccount,
   })
   return smartAccount
})
