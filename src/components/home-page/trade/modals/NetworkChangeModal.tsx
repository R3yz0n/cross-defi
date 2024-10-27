import React from "react"
import ModalWrapper from "../ModalWrapper"

interface INetworkChangeModal {
   isOpen: boolean
}

const NetworkChangeModal: React.FC<INetworkChangeModal> = ({ isOpen }) => {
   return (
      <ModalWrapper isOpen={isOpen} title="Wrong Network">
         <div>
            You are connected to the wrong network. Please switch to the correct network to continue. Approving this will help switch your network
            automatically.
         </div>
      </ModalWrapper>
   )
}

export default NetworkChangeModal
