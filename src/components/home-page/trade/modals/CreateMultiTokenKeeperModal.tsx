import React, { useState } from "react"
import ModalWrapper from "../ModalWrapper"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { btnClick } from "../../../../animations"
import { etherscanBaseUrl } from "./LimitModal"

interface ICreateMultiTokenKeeperModal {
   isOpen: boolean
   onApprove: () => void
   onClose: () => void
   transactionHash?: string | null // Add transactionHash prop
}
const CreateMultiTokenKeeperModal: React.FC<ICreateMultiTokenKeeperModal> = ({ isOpen, onApprove, onClose, transactionHash }) => {
   const [isButtonDisabled, setIsButtonDisabled] = useState(false)

   const handleApprove = () => {
      setIsButtonDisabled(true)
      onApprove()

      setTimeout(() => {
         setIsButtonDisabled(false)
      }, 5000)
   }

   return (
      <ModalWrapper
         confirmButtonTitle="Approve"
         onClose={onClose}
         onConfirm={handleApprove}
         isOpen={isOpen}
         title="Create MultiToken Keeper"
         isConfirmButtonDisabled={isButtonDisabled}
      >
         <div className="text-sm text-text-primary">
            <p>
               You need to deposit 3 Chainlink tokens (LINK) to create your MultiToken Keeper. This action will approve the necessary tokens for the
               keeper creation.
            </p>
            <p className="mt-2">Once approved, the system will automatically create your MultiToken Keeper and deploy it on the blockchain.</p>
            <p className="mt-4 font-semibold">Please confirm if you'd like to proceed with the deposit and creation process.</p>
         </div>

         {/* Transaction Hash (conditionally rendered) */}
         {transactionHash && (
            <section className="mt-4 w-full">
               <h6 className="text-base font-medium text-text-secondary">Transaction Hash</h6>
               <p className="mt-1 w-full break-all text-13px tracking-wide text-text-primary">{transactionHash}</p>
               <motion.button className="mt-4" {...btnClick}>
                  <Link
                     to={`${etherscanBaseUrl}${transactionHash}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-opacity- mt-5 rounded bg-background-primary px-4 py-2 text-sm font-semibold text-text-primary shadow hover:text-text-secondary"
                  >
                     View on Etherscan
                  </Link>
               </motion.button>
            </section>
         )}
      </ModalWrapper>
   )
}

export default CreateMultiTokenKeeperModal
