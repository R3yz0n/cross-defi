import { createThirdwebClient, ThirdwebClient } from "thirdweb"

export const client: ThirdwebClient = createThirdwebClient({
   clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
   //    secretKey: import.meta.env.VITE_THIRD_WEB_SECRET_KEY,
})

export const managedAccountFactory = "0x73Df1aa2D2F17037f38402EA617bdD2cd4F5D251"
