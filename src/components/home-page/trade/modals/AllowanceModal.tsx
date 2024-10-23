import React from "react"
import ModalWrapper from "../ModalWrapper"

interface IAllowanceModal {
   isOpen: boolean
   onApprove: () => void
   onClose: () => void
   transactionHash?: string | null // Add transactionHash prop
}

const AllowanceModal: React.FC<IAllowanceModal> = ({ isOpen, onApprove, onClose, transactionHash }) => {
   return (
      <ModalWrapper confirmButtonTitle="Approve" onClose={onClose} onConfirm={onApprove} isOpen={isOpen} title="Grant Allowance">
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
