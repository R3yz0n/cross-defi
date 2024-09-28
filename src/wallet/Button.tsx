import { useConnect } from "wagmi"
import { metaMask } from "wagmi/connectors"

export function Button() {
   const { connectors, connect } = useConnect()
   console.log(connectors)

   // const filteredConnectors = connectors.filter((connector) => connector.id !== "injected");

   return <button onClick={() => connect({ connector: metaMask() })}>Connect</button>
}
