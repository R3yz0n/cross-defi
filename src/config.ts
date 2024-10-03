import { http, createConfig } from "wagmi"
import { Chain, mainnet, sepolia } from "wagmi/chains"
import { walletConnect } from "wagmi/connectors"

const projectId: string = import.meta.env.VITE_PROJECT_ID
console.log(projectId)

const isProduction: string = import.meta.env.MODE === "production" ? "production" : "development"

const selectedChain: Chain = isProduction === "production" ? mainnet : sepolia

export const config = createConfig({
   chains: [selectedChain],
   connectors: [
      walletConnect({
         projectId,
         qrModalOptions: {
            themeMode: "dark",
         },
      }),
   ],
   transports: {
      [selectedChain.id]: http(),
   },
})
