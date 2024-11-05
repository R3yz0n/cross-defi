import React, { useState } from "react"
import ModalWrapper from "../ModalWrapper"
import { motion } from "framer-motion"
import { btnClick } from "../../../../animations"
import { etherscanBaseUrl } from "./LimitModal"
import { Link } from "react-router-dom"

interface IAllowanceModal {
   isOpen: boolean
   onApprove: () => void
   onClose: () => void
   transactionHash?: string | null // Add transactionHash prop
}

const AllowanceModal: React.FC<IAllowanceModal> = ({ isOpen, onApprove, onClose, transactionHash }) => {
   const [isButtonDisabled, setIsButtonDisabled] = useState(false)

   const handleApprove = () => {
      // setIsButtonDisabled(true)
      onApprove()

      // setTimeout(() => {
      //    setIsButtonDisabled(false) // Enable the button after 2 seconds
      // }, 4000)
   }
   return (
      <ModalWrapper
         confirmButtonTitle="Approve"
         onClose={onClose}
         onConfirm={handleApprove}
         isOpen={isOpen}
         title="Grant Allowance"
         isConfirmButtonDisabled={isButtonDisabled} // Pass the disabled state
      >
         <div>By approving, you will grant the necessary allowance for the MultiKeeper Factory contract to create MultiKeeper Contract.</div>

         {/* Transaction Hash (conditionally rendered) */}
         {true && (
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

export default AllowanceModal
