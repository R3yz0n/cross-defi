import React from "react"
import ReactDOM from "react-dom"
import { motion } from "framer-motion"
import { pop } from "../../animations"

interface IConnectingPersonalWalletModal {
   isOpen: boolean
}

const ConnectingPersonalWalletModal: React.FC<IConnectingPersonalWalletModal> = ({ isOpen }) => {
   if (!isOpen) return null

   return ReactDOM.createPortal(
      <motion.section {...pop} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
         <div className="relative w-[95%] rounded-lg bg-background-secondary p-6 py-10 shadow-lg sm:w-[424px] md:w-[600px] md:p-7 lg:p-8">
            <h2 className="mb-4 text-[22px] font-semibold text-text-primary">Please Approve From Wallet</h2>
            <p className="text-text-primary">
               We're just a moment away from connecting your wallet. This process ensures a secure and seamless experience for your transactions.
            </p>
            <p className="mt-2 text-text-primary">
               Please hold tight as we establish a connection. If you encounter any issues, feel free to reach out for assistance!
            </p>
         </div>
      </motion.section>,
      document.getElementById("modal-root")!
   )
}

export default ConnectingPersonalWalletModal
