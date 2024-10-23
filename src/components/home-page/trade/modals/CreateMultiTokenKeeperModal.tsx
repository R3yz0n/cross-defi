import React from "react"
import ModalWrapper from "../ModalWrapper"

interface ICreateMultiTokenKeeperModal {
   isOpen: boolean
   onApprove: () => void
   onClose: () => void
}

const CreateMultiTokenKeeperModal: React.FC<ICreateMultiTokenKeeperModal> = ({ isOpen, onApprove, onClose }) => {
   return (
      <ModalWrapper
         confirmButtonTitle="Approve"
         onClose={onClose}
         onConfirm={onApprove}
         isOpen={isOpen}
         title="Would you like  to create a multitoken keeper ?"
      >
         <div></div>
      </ModalWrapper>
   )
}

export default CreateMultiTokenKeeperModal
