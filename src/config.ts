import { http, createConfig } from "wagmi"
import { base, mainnet, sepolia } from "wagmi/chains"
import { walletConnect } from "wagmi/connectors"

const projectId = "1d719e02b32a48b3b50e01a2fcd8d0a7"

export const config = createConfig({
   chains: [mainnet, sepolia, base],
   connectors: [walletConnect({ projectId })],
   transports: {
      [mainnet.id]: http(),
      [base.id]: http(),

      [sepolia.id]: http(),
   },
})
