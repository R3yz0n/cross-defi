import React, { useState } from "react"
import ModalWrapper from "../ModalWrapper"

interface ICommonAllowanceModal {
   isOpen: boolean
   onClose?: () => void
   transactionHash?: string | null // Add transactionHash prop
}

const CommonAllowanceModal: React.FC<ICommonAllowanceModal> = ({ isOpen, onClose, transactionHash }) => {
   const [isButtonDisabled, setIsButtonDisabled] = useState(false)

   const handleApprove = () => {
      setIsButtonDisabled(true)
      // onApprove()

      setTimeout(() => {
         setIsButtonDisabled(false) // Enable the button after 4 seconds
      }, 4000)
   }

   return (
      <ModalWrapper
         // confirmButtonTitle="Approve"
         onClose={onClose}
         // onConfirm={handleApprove}
         isOpen={isOpen}
         title="Grant Allowance"
         isConfirmButtonDisabled={isButtonDisabled} // Pass the disabled state
      >
         <div>
            Approving this transaction will allow the necessary permissions to proceed. You can review the transaction hash for details once the
            transaction is completed.
            {transactionHash && (
               <div>
                  <strong>Transaction Hash:</strong> {transactionHash}
               </div>
            )}
         </div>
      </ModalWrapper>
   )
}

export default CommonAllowanceModal
