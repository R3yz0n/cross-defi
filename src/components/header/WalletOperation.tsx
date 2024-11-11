import { IoMdLogOut } from "react-icons/io"
import { IoMdSettings } from "react-icons/io"
import { motion } from "framer-motion"
import { btnClick, pop } from "../../animations"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { removeWalletAddress } from "../../store/walletSlice"
import { FaRegListAlt } from "react-icons/fa"
import { RiFileHistoryFill } from "react-icons/ri"

interface IWalletOperation {
   onCloseDropDown: () => void
}
const WalletOperation: React.FC<IWalletOperation> = (props) => {
   const dispatch = useDispatch<AppDispatch>()

   return (
      <motion.section
         {...pop}
         className="absolute right-0 top-10 z-50 flex w-44 flex-col gap-1 rounded border border-gray-700 bg-background-secondary py-3 text-sm shadow-md md:top-12 md:w-52 md:gap-2 md:pb-5 md:pt-3 md:text-base 2xl:w-60 2xl:text-xl"
      >
         <motion.button onClick={() => props.onCloseDropDown} {...btnClick} type="button">
            <h3 className="flex items-center gap-3 rounded-md px-3.5 py-1.5 hover:bg-background-primary">
               <IoMdSettings className="text-[1.2em]" />
               Settings
            </h3>
         </motion.button>

         <motion.button onClick={() => props.onCloseDropDown} {...btnClick} type="button">
            <h3 className="flex items-center gap-3 rounded-md px-3.5 py-1.5 hover:bg-background-primary">
               <FaRegListAlt className="text-[1.2em]" />
               Order History
            </h3>
         </motion.button>

         <motion.button onClick={() => props.onCloseDropDown} {...btnClick} type="button">
            <h3 className="flex items-center gap-3 rounded-md px-3.5 py-1.5 hover:bg-background-primary">
               <RiFileHistoryFill className="text-[1.2em]" />
               Trade History
            </h3>
         </motion.button>

         <motion.button
            onClick={() => {
               dispatch(removeWalletAddress())
               props.onCloseDropDown()
            }}
            {...btnClick}
            type="button"
         >
            <h3 className="flex items-center gap-3 rounded-md px-3.5 py-1.5 text-yellow hover:bg-background-primary">
               <IoMdLogOut className="text-[1.2em] text-yellow" />
               Disconnect
            </h3>
         </motion.button>
      </motion.section>
   )
}
export default WalletOperation
