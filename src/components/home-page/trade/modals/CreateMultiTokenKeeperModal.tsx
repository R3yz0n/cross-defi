import React from "react"
import ModalWrapper from "../ModalWrapper"

interface ICreateMultiTokenKeeperModal {
   isOpen: boolean
   onApprove: () => void
   onClose: () => void
   transactionHash?: string | null // Add transactionHash prop
}

const CreateMultiTokenKeeperModal: React.FC<ICreateMultiTokenKeeperModal> = ({ isOpen, onApprove, onClose, transactionHash }) => {
   return (
      <ModalWrapper confirmButtonTitle="Approve" onClose={onClose} onConfirm={onApprove} isOpen={isOpen} title="Create MultiToken Keeper">
         <div className="text-sm text-gray-700">
            <p>
               You need to deposit 3 Chainlink tokens (LINK) to create your MultiToken Keeper. This action will approve the necessary tokens for the
               keeper creation.
            </p>
            <p className="mt-2">Once approved, the system will automatically create your MultiToken Keeper and deploy it on the blockchain.</p>
            <p className="mt-2 font-semibold">Please confirm if you'd like to proceed with the deposit and creation process.</p>
         </div>

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

export default CreateMultiTokenKeeperModal
