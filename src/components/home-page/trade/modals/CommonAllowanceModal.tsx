import React, { useState } from "react"
import ModalWrapper from "../ModalWrapper"

interface ICommonAllowanceModal {
   isOpen: boolean
   onClose: () => void
   transactionHash?: string | null // Add transactionHash prop
}

const CommonAllowanceModal: React.FC<ICommonAllowanceModal> = ({ isOpen, transactionHash, onClose }) => {
   const [isButtonDisabled, setIsButtonDisabled] = useState(false)

   const handleApprove = () => {
      setIsButtonDisabled(true)
      // onApprove()

      setTimeout(() => {
         setIsButtonDisabled(false) // Enable the button after 4 seconds
      }, 4000)
   }

   return (
      <ModalWrapper onClose={onClose} isCloseButtonDisabled={true} isOpen={isOpen} title="Grant Allowance" isConfirmButtonDisabled={isButtonDisabled}>
         <div className="text-text-primary">
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
