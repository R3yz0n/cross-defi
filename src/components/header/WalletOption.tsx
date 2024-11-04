import { motion } from "framer-motion"
// import { useConnect } from "wagmi"
import { btnClick, pop } from "../../animations"
import { client, managedAccountFactory } from "../../config/thirdweb"
import { createWallet, inAppWallet, smartWallet } from "thirdweb/wallets"
import { baseSepolia } from "thirdweb/chains"
import { useDispatch } from "react-redux"
import { setUserDetails } from "../../store/userDetails"

const personalWallet: any = inAppWallet()

interface IWalletOption {
   onCloseDropDown: () => void
}
export function WalletOptions(props: IWalletOption) {
   // Take showModal and setShowModal as props

   const dispatch = useDispatch()

   const handleConnect = async (wallet: any) => {
      props.onCloseDropDown()
      const connector = wallet.connector
      const personalAccount = await personalWallet.connect({
         strategy: "wallet",
         chain: baseSepolia,
         wallet: connector as any,
         client: client,
      })

      const Swallet = smartWallet({
         chain: baseSepolia,
         factoryAddress: managedAccountFactory,
         gasless: true,
         clientId: "485a0fd95563acb5d9b22ab679e13022",
      })

      const smartAccount = await Swallet.connect({
         chain: baseSepolia,
         client,
         personalAccount,
      })

      console.log(smartAccount)
      dispatch(
         setUserDetails({
            personalAccount: personalAccount,
            smartAccount: smartAccount,
         })
      )

      // const tx = await smartAccount.sendTransaction({
      //    to: "0x75998e806D0BE5B37c5DE74AcfA0006B3C7DCdfF",
      //    value: "10000",
      // })

      // console.log(tx)
   }

   const wallets = [
      {
         image: "MetaMask.png",
         name: "MetaMask",
         connector: createWallet("io.metamask"),
      },
      {
         image: "WalletConnect.png",
         name: "WalletConnect",
         connector: createWallet("walletConnect"),
      },
   ]

   return (
      <motion.section
         {...pop}
         className="absolute right-0 top-10 z-50 flex w-44 flex-col gap-1 rounded border border-gray-700 bg-background-secondary py-3 text-sm shadow-md md:top-12 md:w-52 md:gap-2 md:pb-5 md:pt-3 md:text-base 2xl:w-60 2xl:text-xl"
      >
         {wallets.map((wallet, index) => (
            <button key={wallet.name} onClick={() => handleConnect(wallet)}>
               <motion.h3 {...btnClick} className="flex items-center gap-3 rounded-md px-3.5 py-1.5 hover:bg-background-primary">
                  <img className="h-8 w-8 2xl:h-10 2xl:w-10" src={wallet.image} alt="icon" />
                  {wallet.name}
               </motion.h3>
            </button>
         ))}
      </motion.section>
   )
}
