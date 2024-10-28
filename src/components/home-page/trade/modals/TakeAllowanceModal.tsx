import React from "react"
import ModalWrapper from "../ModalWrapper"

interface TakeAllowanceModal {
   isOpen: boolean
   onClose: () => void
   transactionHash?: string | null
   onTakeAllowance:()=>void
}

const TakeAllowanceModal: React.FC<TakeAllowanceModal> = ({ isOpen, onClose, onTakeAllowance }) => {
   return (
      <ModalWrapper onConfirm={onTakeAllowance} onClose={onClose} isOpen={isOpen} title="Insufficient Balance" confirmButtonTitle="Take Allowance">
         <div className="text-sm text-text-secondary">
            <p>It appears that you don’t have enough allowance to proceed.</p>
            <p className="mt-2">Once the deposit is made, Please try again.</p>
         </div>
      </ModalWrapper>
   )
}

export default TakeAllowanceModal
