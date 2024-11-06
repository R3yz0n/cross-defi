import React from "react"
import ModalWrapper from "../ModalWrapper"

interface ITransactionApprovingModal {
   isOpen: boolean
   onClose: () => void
   message: string
}

const TransactionApprovingModal: React.FC<ITransactionApprovingModal> = ({ isOpen, onClose, message }) => {
   return (
      <ModalWrapper isCloseButtonDisabled={true} onClose={onClose} isOpen={isOpen} title="">
         <div>{message}</div>
      </ModalWrapper>
   )
}

export default TransactionApprovingModal
