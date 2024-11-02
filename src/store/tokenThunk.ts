import { createAsyncThunk } from "@reduxjs/toolkit"
// import { config } from "../config/wallet-config"
// import { readContract } from "@wagmi/core"
import { erc20Abi } from "viem"
import { ethers } from "ethers"

// Utility function to read a smart contract
const executeReadContract = async (abi: any, address: string, functionName: string, args: any[]) => {
   try {
      return 0 //await readContract(config, { abi, address, functionName, args })
   } catch (error) {
      console.log(error)
      return null
   }
}

// asynchornous fetch the token balance
export const fetchTokenBalance = createAsyncThunk<string | number, { tokenAddress: string; walletAddress: string; decimals: number }, {}>(
   "tokens/fetchTokenBalance",
   async ({ tokenAddress, walletAddress, decimals }, { rejectWithValue }) => {
      try {
         const balance = await executeReadContract(erc20Abi, tokenAddress, "balanceOf", [walletAddress])
         return balance ? parseFloat(ethers.formatUnits(balance, decimals)).toFixed(4) : 0
      } catch (error) {
         console.error("Failed to fetch token balance", error)
         return rejectWithValue("Failed to fetch token balance")
      }
   }
)
