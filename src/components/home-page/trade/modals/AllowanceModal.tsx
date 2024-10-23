import React from "react"
import ModalWrapper from "../ModalWrapper"

interface IAllowanceModal {
   isOpen: boolean
   onApprove: () => void
   onClose: () => void
}

const AllowanceModal: React.FC<IAllowanceModal> = ({ isOpen, onApprove, onClose }) => {
   return (
      <ModalWrapper
         confirmButtonTitle="Approve"
         onClose={onClose}
         onConfirm={onApprove}
         isOpen={isOpen}
         title="Would you like  to give an allowance ?"
      >
         <div></div>
      </ModalWrapper>
   )
}

export default AllowanceModal
