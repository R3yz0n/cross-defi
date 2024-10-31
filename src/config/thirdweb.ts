import { createThirdwebClient, ThirdwebClient } from "thirdweb"

export const client: ThirdwebClient = createThirdwebClient({ clientId: import.meta.env.VITE_CLIENT_ID, secretKey: import.meta.env.VITE_SECRET_KEY })
