// import { useConnect } from "wagmi"
// import { metaMask } from "wagmi/connectors"

import { ConnectButton } from "thirdweb/react"
import { createWallet } from "thirdweb/wallets"
import { client } from "../config/thirdweb"

const wallets = [createWallet("io.metamask"), createWallet("com.coinbase.wallet"), createWallet("me.rainbow")]

export function Button() {
   // const { connectors, connect } = useConnect()
   // console.log(connectors)

   // const filteredConnectors = connectors.filter((connector) => connector.id !== "injected");

   return <ConnectButton client={client} wallets={wallets} />
   // <button onClick={() => connect({ connector: metaMask() })}>Connect</button>
}
