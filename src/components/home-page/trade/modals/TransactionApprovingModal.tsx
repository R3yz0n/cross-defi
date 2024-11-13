import React from "react"
import ModalWrapper from "../ModalWrapper"

interface ITransactionApprovingModal {
   isOpen: boolean
   onClose: () => void
}

const TransactionApprovingModal: React.FC<ITransactionApprovingModal> = ({ isOpen, onClose }) => {
   return (
      <ModalWrapper isCloseButtonDisabled={true} onClose={onClose} isOpen={isOpen} title="Token Approval">
         <div className="text-text-primary">
            We are currently approving your token. Once this approval is completed, it will automatically create a multi-token keeper. This approval
            is only required one time, and subsequent transactions will proceed smoothly without needing this approval step again.
         </div>
      </ModalWrapper>
   )
}

export default TransactionApprovingModal
