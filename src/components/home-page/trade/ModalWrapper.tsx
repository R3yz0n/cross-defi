import { motion } from "framer-motion"
import React from "react"
import ReactDOM from "react-dom"
import { btnClick, pop } from "../../../animations"

interface IModalWrapperProps {
   isOpen: boolean
   onClose: () => void
   onConfirm?: () => void
   children: React.ReactNode
   title?: string

   confirmButtonTitle?: string
   isLoading?: boolean
}

const ModalWrapper: React.FC<IModalWrapperProps> = ({
   isOpen,
   onClose,
   onConfirm,
   children,
   title,
   isLoading,

   confirmButtonTitle,
}) => {
   if (!isOpen) return null
   return ReactDOM.createPortal(
      <motion.section {...pop} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="relative w-[95%] rounded-lg bg-background-secondary p-6 shadow-lg sm:w-[424px] md:w-[600px] md:p-7 lg:p-8">
            {title && <h2 className="flex gap-2 text-lg font-medium text-text-primary md:text-xl"> {title}</h2>}

            <motion.button {...btnClick} className="absolute right-3 top-1 text-3xl text-text-primary hover:text-red" onClick={onClose}>
               &times;
            </motion.button>

            <aside className="mt-4 w-full">{children}</aside>

            <aside className="mt-6 flex justify-end space-x-4 text-sm font-semibold">
               {isLoading && (
                  <span className="flex items-center gap-2 rounded-md bg-background-primary px-3 py-2.5">
                     <svg
                        aria-hidden="true"
                        className="h-5 w-5 animate-spin fill-blue-600 dark:text-gray-400"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                           fill="currentColor"
                        />
                        <path
                           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                           fill="currentFill"
                        />
                     </svg>
                     Processing
                  </span>
               )}

               <motion.button
                  {...btnClick}
                  className="rounded border border-yellow px-3 py-1 text-text-primary hover:bg-yellow hover:bg-opacity-10 md:px-4 md:py-1.5"
                  onClick={onClose}
               >
                  Cancel
               </motion.button>
               {confirmButtonTitle && (
                  <motion.button
                     {...btnClick}
                     className="rounded bg-yellow px-3 py-1 text-sm text-gray-900 hover:contrast-75 md:px-4 md:py-1.5 md:text-base"
                     onClick={onConfirm}
                  >
                     {confirmButtonTitle}
                  </motion.button>
               )}
            </aside>
         </div>
      </motion.section>,
      document.getElementById("modal-root")!
   )
}

export default ModalWrapper
