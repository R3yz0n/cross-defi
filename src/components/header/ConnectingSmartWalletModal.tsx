import React from "react"
import ReactDOM from "react-dom"
import { motion } from "framer-motion"
import { pop } from "../../animations"

interface IConnectingSmartWalletModal {
   isOpen: boolean
}

const ConnectingSmartWalletModal: React.FC<IConnectingSmartWalletModal> = ({ isOpen }) => {
   if (!isOpen) return null

   return ReactDOM.createPortal(
      <motion.section {...pop} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="relative w-[95%] rounded-lg bg-background-secondary p-6 py-10 shadow-lg sm:w-[424px] md:w-[600px] md:p-7 lg:p-8">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">Connecting Wallet</h2>
            <p className="text-gray-600">Hi there! We're fetching your smart account.</p>
         </div>
      </motion.section>,
      document.getElementById("modal-root")!
   )
}

export default ConnectingSmartWalletModal
