import { createThirdwebClient, ThirdwebClient } from "thirdweb"

export const client: ThirdwebClient = createThirdwebClient({
   clientId: import.meta.env.VITE_THIRD_WEB_CLIENT_ID,
   //    secretKey: import.meta.env.VITE_SECRET_KEY,
})
