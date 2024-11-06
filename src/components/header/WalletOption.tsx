import { motion } from "framer-motion"
import { btnClick, pop } from "../../animations"
import { createWallet } from "thirdweb/wallets"
import { useDispatch } from "react-redux"

import { AppDispatch } from "../../store/store"
import { connectPersonalWallet, connectSmartWallet } from "../../store/walletThunk"
import { addConnectorId, addWalletAddress } from "../../store/walletSlice"

interface IWalletOption {
   onCloseDropDown: () => void
}

export function WalletOptions(props: IWalletOption) {
   const dispatch = useDispatch<AppDispatch>()

   const handleConnect = async (wallet: any) => {
      props.onCloseDropDown()

      try {
         dispatch(addConnectorId(wallet.connector.id))
         const personalAccount = await dispatch(connectPersonalWallet({ connector: wallet.connector })).unwrap()

         const smartAccount = await dispatch(connectSmartWallet({ personalAccount })).unwrap()

         dispatch(addWalletAddress(smartAccount.address))

         console.log("Wallets connected successfully")
      } catch (error) {
         console.error("Failed to connect wallets:", error)
      }
   }

   return (
      <motion.section
         {...pop}
         className="absolute right-0 top-10 z-50 flex w-44 flex-col gap-1 rounded border border-gray-700 bg-background-secondary py-3 text-sm shadow-md md:top-12 md:w-52 md:gap-2 md:pb-5 md:pt-3 md:text-base 2xl:w-60 2xl:text-xl"
      >
         {supportedWallets.map((wallet, index) => (
            <button key={index} onClick={() => handleConnect(wallet)}>
               <motion.h3 {...btnClick} className="flex items-center gap-3 rounded-md px-3.5 py-1.5 hover:bg-background-primary">
                  <img className="h-8 w-8 2xl:h-10 2xl:w-10" src={wallet.image} alt="icon" />
                  {wallet.name}
               </motion.h3>
            </button>
         ))}
      </motion.section>
   )
}

export const supportedWallets = [
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
