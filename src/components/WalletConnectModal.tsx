import React from "react"
import ReactDOM from "react-dom"
import { motion } from "framer-motion"
import { pop, btnClick } from "../animations"
import { addWalletAddress } from "../store/walletSlice"
import { connectPersonalWallet, connectSmartWallet } from "../store/walletThunk"
import { useDispatch } from "react-redux"
import { supportedWallets } from "./header/WalletOption"
import { AppDispatch } from "../store/store"

interface IWalletConnectModalProps {
   isOpen: boolean
   onClose: () => void
}

const WalletConnectModal: React.FC<IWalletConnectModalProps> = ({ isOpen, onClose }) => {
   const dispatch = useDispatch<AppDispatch>()
   const handleConnect = async (wallet: any) => {
      try {
         onClose()
         const personalAccount = await dispatch(connectPersonalWallet({ connector: wallet.connector })).unwrap()
         const smartAccount = await dispatch(connectSmartWallet({ personalAccount })).unwrap()
         dispatch(addWalletAddress(smartAccount.address))
         console.log("Wallets connected successfully")
      } catch (error) {
         console.error("Failed to connect wallets:", error)
      }
   }
   if (!isOpen) return null

   return ReactDOM.createPortal(
      <motion.section {...pop} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
         <div className="relative w-[85%] rounded-lg bg-background-secondary p-6 shadow-lg sm:w-[424px] md:w-[450px] md:p-7 lg:py-8">
            <motion.button
               {...btnClick}
               className="absolute right-3 top-1 cursor-pointer text-3xl text-text-primary hover:text-red"
               onClick={onClose}
            >
               &times;
            </motion.button>

            <aside className="mt-6 flex flex-col items-center text-sm font-semibold">
               <div className="mb-4 w-full px-3 text-xl">
                  <h4>Wallet not connected. Continue with </h4>
               </div>

               {supportedWallets.map((wallet, index) => (
                  <button className="w-full" key={index} onClick={() => handleConnect(wallet)}>
                     <motion.h3 {...btnClick} className="flex items-center gap-3 rounded-md px-3 py-1.5 hover:bg-background-primary">
                        <img className="h-8 w-8 2xl:h-10 2xl:w-10" src={wallet.image} alt="icon" />
                        {wallet.name}
                     </motion.h3>
                  </button>
               ))}
            </aside>
         </div>
      </motion.section>,
      document.body
   )
}
export default WalletConnectModal
