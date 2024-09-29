import React from "react"
import ReactDOM from "react-dom"

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
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
         <div className="bg-background-tertiary   rounded-lg shadow-lg p-6  md:p-7 lg:p-8 relative w-[95%] sm:w-[424px] md:w-[600px]">
            <h2 className="text-lg md:text-xl font-medium text-text-primary"> {title}</h2>
            <button className="absolute top-1 right-3 text-text-primary text-3xl hover:text-red" onClick={onClose}>
               &times;
            </button>

            <aside className="mt-4  md:w-4/5">{children}</aside>

            <aside className="mt-6 flex justify-end text-sm space-x-4 font-semibold">
               <button
                  className="px-3 md:px-4 py-1 md:py-1.5 text-text-primary border-yellow border rounded hover:bg-yellow hover:bg-opacity-10  "
                  onClick={onClose}
               >
                  Cancel
               </button>
               {showConfirmButton && (
                  <button
                     className="px-3 text-sm md:text-base md:px-4 py-1 md:py-1.5 bg-yellow text-gray-900  rounded hover:contrast-75"
                     onClick={onConfirm}
                  >
                     Confirm
                  </button>
               )}
            </aside>
         </div>
      </section>,
      document.getElementById("modal-root")!
   )
}

export default ModalWrapper
