import { BsTriangleFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { ITokenType, selectTokenInSideBar } from "../../store/tokenSlice"
import { ReactNode, useEffect } from "react"
import { motion } from "framer-motion"
import { btnClick } from "../../animations"
import { SidebarItem } from "./RightSideBar"
import { IconBaseProps, IconType } from "react-icons"
import { useLocation, useParams } from "react-router-dom"

const MenuItemCard: React.FC<{ name: string; icon: ReactNode }> = ({ name, icon }) => {
   //    const dispatch = useDispatch<AppDispatch>()
   //    const { selectedTokenInSideBar } = useSelector((state: RootState) => state.token)

   //    useEffect(() => {
   //       //   dispatch(selectTokenInSideBar(1))
   //    }, [])
   const { pathname } = useLocation()
   console.log(pathname)

   return (
      <motion.li
         {...btnClick}
         onClick={() => {
            // dispatch(selectTokenInSideBar(token?.id))
            // onToggleMenu()
         }}
         className="flex cursor-pointer gap-2 rounded-md border-b border-b-gray-700 px-3 py-3 shadow hover:bg-background-secondary"
      >
         <h2 className="text-text text-2xl"> {icon}</h2>
         <h4 className="">{name}</h4>
      </motion.li>
   )
}

export default MenuItemCard
