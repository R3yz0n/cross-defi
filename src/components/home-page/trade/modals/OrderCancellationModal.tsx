import React, { useState } from "react"
import ModalWrapper from "../ModalWrapper"
import { motion } from "framer-motion"
import { btnClick } from "../../../../animations"

interface IOrderCancellationModal {
   isOpen: boolean
   onClose: () => void
   onConfirm: () => void
   message: string
}

const OrderCancellationModal: React.FC<IOrderCancellationModal> = ({ isOpen, onClose, onConfirm, message }) => {
   return (
      <ModalWrapper onClose={onClose} isCloseButtonDisabled={true} isOpen={isOpen} title="Are you sure ? ">
         <div className="pb-10 text-text-primary">{message}</div>
         <div className="absolute bottom-5 right-5 flex w-full justify-end gap-5">
            <motion.button
               onClick={onConfirm}
               {...btnClick}
               className="rounded bg-yellow px-3 py-1 text-sm text-gray-900 hover:contrast-75 md:px-4 md:py-1.5 md:text-base"
            >
               Yes
            </motion.button>

            <motion.button
               {...btnClick}
               className="rounded border border-yellow px-3 py-1 text-text-primary hover:bg-yellow hover:bg-opacity-10 md:px-4 md:py-1.5"
               onClick={onClose}
            >
               No
            </motion.button>
         </div>
      </ModalWrapper>
   )
}

export default OrderCancellationModal
