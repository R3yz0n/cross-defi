import TokenCard from "./TokenCard"

import { FaWallet, FaChartLine, FaExchangeAlt } from "react-icons/fa"
import { AiOutlineStock, AiOutlineRobot, AiOutlinePicture } from "react-icons/ai"
import { RiCoinsLine } from "react-icons/ri"
import { MdOutlineArticle } from "react-icons/md"
import { IconBaseProps, IconType } from "react-icons"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { searchTokenInSideBar } from "../../store/tokenSlice"
import MenuItemCard from "./MenuItemCard"
import { ReactNode } from "react"
import { motion } from "framer-motion"
import { btnClick } from "../../animations"
import { BsSearch } from "react-icons/bs"

interface IRightSideBarProps {
   onToggleMenu: () => void
}

const RightSideBar: React.FC<IRightSideBarProps> = () => {
   // const { tokens } = useSelector((state: RootState) => state.token)
   // const dispatch = useDispatch<AppDispatch>()

   // const handleSearchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    dispatch(searchTokenInSideBar(e.target.value))
   // }
   return (
      <section className="h-full w-52 bg-background-primary px-1 py-1 md:w-60 xl:block xl:py-0 2xl:w-[316px] 2xl:px-3">
         <ul className="mt-5 flex h-[70vh] flex-col gap-3 overflow-y-auto text-text-primary xl:h-[90vh] 2xl:gap-4">
            <div className="group relative mx-auto mb-5 w-[95%] rounded-md border border-text-secondary hover:border-yellow 2xl:w-full">
               <input
                  type="text"
                  // onChange={handleSearchToken}
                  className="sticky top-0 w-full rounded-md border border-none bg-transparent px-4 py-2 text-sm text-text-primary focus:outline-none md:text-15px 2xl:py-2 2xl:text-base"
                  placeholder="Search tokens"
               />
               <button className="absolute right-3 top-2 2xl:top-3">
                  <BsSearch size={17} className="duration-300 ease-in-out group-hover:scale-110" />
               </button>
            </div>

            <motion.li
               {...btnClick}
               onClick={() => {
                  // dispatch(selectTokenInSideBar(token?.id))
                  // onToggleMenu()
               }}
               className="flex gap-2 rounded-md border-l-4 border-yellow bg-background-secondary px-3 py-3 font-bold"
            >
               <h2 className="text-2xl">
                  <AiOutlineStock />
               </h2>
               <h4 className="">Trade</h4>
            </motion.li>
            {sidebarItems.map((item) => (
               <MenuItemCard key={item.id} name={item.name} icon={item.icon} />
            ))}
         </ul>
      </section>
   )
}

export default RightSideBar
{
   /* <section className="h-full w-[280px] bg-background-primary px-1 py-4 md:py-6 xl:block 2xl:w-[316px] 2xl:px-3">
         <div className="group relative mx-auto w-[95%] rounded-md border border-text-secondary hover:border-yellow 2xl:w-full">
            <input
               type="text"
               onChange={handleSearchToken}
               className="sticky top-0 w-full rounded-md border border-none bg-transparent px-4 py-2 text-sm text-text-primary focus:outline-none md:text-15px 2xl:py-2 2xl:text-base"
               placeholder="Search for Crypto"
            />
            <button className="absolute right-3 top-2 2xl:top-3">
               <BsSearch size={17} className="duration-300 ease-in-out group-hover:scale-110" />
            </button>
         </div>
         <ul className="mt-5 flex h-[70vh] flex-col gap-3 overflow-y-auto xl:h-[90vh] 2xl:gap-4">
            {tokens?.map((token) => <TokenCard onToggleMenu={props.onToggleMenu} key={token?.id} token={token} />)}
         </ul>
      </section> */
}

export interface SidebarItem {
   id: number
   name: string
   // write the t ype of react icons

   icon: ReactNode
}

// Define the array of sidebar items
const sidebarItems: SidebarItem[] = [
   { id: 1, name: "Cryptos", icon: <RiCoinsLine /> },
   { id: 2, name: "Wallet", icon: <FaWallet /> },
   { id: 3, name: "Trade", icon: <AiOutlineStock /> },
   { id: 4, name: "Cross Chain Swap", icon: <FaExchangeAlt /> },
   { id: 5, name: "Charts", icon: <FaChartLine /> },
   { id: 6, name: "Trading AI", icon: <AiOutlineRobot /> },
   { id: 7, name: "Staking AI", icon: <AiOutlineRobot /> },
   { id: 8, name: "AI Image Generator", icon: <AiOutlinePicture /> },
   { id: 9, name: "News by AI", icon: <MdOutlineArticle /> },
]
