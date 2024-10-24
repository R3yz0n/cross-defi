import React, { useState } from "react"
import ModalWrapper from "../ModalWrapper"

interface IAllowanceModal {
   isOpen: boolean
   onApprove: () => void
   onClose: () => void
   transactionHash?: string | null // Add transactionHash prop
}

const AllowanceModal: React.FC<IAllowanceModal> = ({ isOpen, onApprove, onClose, transactionHash }) => {
   const [isButtonDisabled, setIsButtonDisabled] = useState(false)

   const handleApprove = () => {
      setIsButtonDisabled(true)
      onApprove()

      setTimeout(() => {
         setIsButtonDisabled(false) // Enable the button after 2 seconds
      }, 4000)
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

         {transactionHash && (
            <div className="mt-4">
               <strong>Transaction Hash:</strong>{" "}
               <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                  {transactionHash}
               </a>
            </div>
         )}
      </ModalWrapper>
   )
}

export default AllowanceModal
