import { motion } from "framer-motion"
import React from "react"
import ReactDOM from "react-dom"
import { btnClick, pop } from "../../animations"

interface IModalWrapperProps {
   isOpen: boolean
   onClose: () => void
   onConfirm?: () => void
   children: React.ReactNode
   title: string
   showConfirmButton?: boolean
}

const ModalWrapper: React.FC<IModalWrapperProps> = ({ isOpen, onClose, onConfirm, children, title, showConfirmButton = true }) => {
   if (!isOpen) return null
   return ReactDOM.createPortal(
      <motion.section {...pop} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="relative w-[95%] rounded-lg bg-background-secondary p-6 shadow-lg sm:w-[424px] md:w-[600px] md:p-7 lg:p-8">
            <h2 className="text-lg font-medium text-text-primary md:text-xl"> {title}</h2>
            <motion.button {...btnClick} className="absolute right-3 top-1 text-3xl text-text-primary hover:text-red" onClick={onClose}>
               &times;
            </motion.button>

            <aside className="mt-4 md:w-4/5">{children}</aside>

            <aside className="mt-6 flex justify-end space-x-4 text-sm font-semibold">
               <motion.button
                  {...btnClick}
                  className="rounded border border-yellow px-3 py-1 text-text-primary hover:bg-yellow hover:bg-opacity-10 md:px-4 md:py-1.5"
                  onClick={onClose}
               >
                  Cancel
               </motion.button>
               {showConfirmButton && (
                  <motion.button
                     {...btnClick}
                     className="rounded bg-yellow px-3 py-1 text-sm text-gray-900 hover:contrast-75 md:px-4 md:py-1.5 md:text-base"
                     onClick={onConfirm}
                  >
                     Confirm
                  </motion.button>
               )}
            </aside>
         </div>
      </motion.section>,
      document.getElementById("modal-root")!
   )
}

export default ModalWrapper
