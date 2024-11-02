import { motion } from "framer-motion"
// import { useConnect } from "wagmi"
import { btnClick, pop } from "../../animations"
import { ConnectButton } from "thirdweb/react"
import { client } from "../../config/thirdweb"
import { createWallet } from "thirdweb/wallets"

interface IWalletOption {
   onCloseDropDown: () => void
}
export function WalletOptions(props: IWalletOption) {
   // Take showModal and setShowModal as props
   // const { connectors, connect } = useConnect()

   const handleConnect = (connector: any) => {
      // connect({ connector })
      props.onCloseDropDown()
   }

   const imgs: string[] = ["WalletConnect.png", "MetaMask.png"]

   const wallets = [createWallet("io.metamask"), createWallet("com.coinbase.wallet"), createWallet("me.rainbow")]

   // return (
   //    <motion.section
   //       {...pop}
   //       className="absolute right-0 top-10 z-50 flex w-44 flex-col gap-1 rounded border border-gray-700 bg-background-secondary py-3 text-sm shadow-md md:top-12 md:w-52 md:gap-2 md:pb-5 md:pt-3 md:text-base 2xl:w-60 2xl:text-xl"
   //    >
   //       {connectors.map((connector, index) => (
   //          <button key={connector.id} onClick={() => handleConnect(connector)}>
   //             <motion.h3 {...btnClick} className="flex items-center gap-3 rounded-md px-3.5 py-1.5 hover:bg-background-primary">
   //                <img className="h-8 w-8 2xl:h-10 2xl:w-10" src={imgs[index]} alt="icon" />
   //                {connector.name}
   //             </motion.h3>
   //          </button>
   //       ))}
   //    </motion.section>
   // )

   return (
      <div>
         <ConnectButton client={client} wallets={wallets} />
      </div>
   )
}
