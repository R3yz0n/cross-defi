import { createThirdwebClient, ThirdwebClient } from "thirdweb"

export const client: ThirdwebClient = createThirdwebClient({
   clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
   //    secretKey: import.meta.env.VITE_THIRD_WEB_SECRET_KEY,
})
export const managedAccountFactory = import.meta.env.VITE_THIRD_WEB_MANAGED_ACCOUNT_FACTORY
