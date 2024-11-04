import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Account } from "viem"

// Define the structure of the user state
export interface IUserState {
   personalAccount: any
   smartAccount: Account | null
   isConnected: boolean
}

const initialUserState: IUserState = {
   personalAccount: null,
   smartAccount: null,
   isConnected: false,
}

// Create the userSlice
export const userSlice = createSlice({
   name: "user",
   initialState: initialUserState,
   reducers: {
      setUserDetails: (state, action: PayloadAction<{ personalAccount: any; smartAccount: Account }>) => {
         state.personalAccount = action.payload.personalAccount
         state.smartAccount = action.payload.smartAccount
         state.isConnected = true
      },
      clearUserDetails: (state) => {
         state.personalAccount = null
         state.smartAccount = null
         state.isConnected = false
      },
   },
})

// Export actions and reducer
export const { setUserDetails, clearUserDetails } = userSlice.actions
export default userSlice.reducer
