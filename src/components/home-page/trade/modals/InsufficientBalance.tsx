import React from "react"
import ModalWrapper from "../ModalWrapper"

interface InsufficientBalance {
   isOpen: boolean
   onClose: () => void
}

const InsufficientBalance: React.FC<InsufficientBalance> = ({ isOpen, onClose }) => {
   return (
      <ModalWrapper onClose={onClose} isOpen={isOpen} isCloseButtonDisabled={true} title="Insufficient Balance">
         <div className="text-sm text-text-primary">
            <p>
               It appears that you don’t have enough Chainlink tokens (LINK) to proceed. You need to deposit 3 LINK tokens to create your MultiToken
               Keeper.
            </p>
            <p className="mt-2">Once the deposit is made, Please try again.</p>
         </div>
      </ModalWrapper>
   )
}

export default InsufficientBalance
