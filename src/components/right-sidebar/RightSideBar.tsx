import { motion } from "framer-motion"
import { btnClick } from "../../animations"
import MenuItemCard from "./MenuItemCard"
import { IoMdClose } from "react-icons/io"
import { sidebarItems } from "../PagesRoutes"

interface IRightSideBarProps {
   onToggleMenu: () => void
}

const RightSideBar: React.FC<IRightSideBarProps> = (props) => {
   return (
      <section className="h-full w-56 bg-background-primary px-2 py-0.5 md:w-60 xl:block xl:py-0 2xl:w-[316px] 2xl:px-3">
         <ul className="mt-2 flex h-[70vh] flex-col gap-3 overflow-y-auto text-text-primary md:mt-5 xl:h-[90vh] 2xl:gap-4">
            <motion.button
               {...btnClick}
               type="button"
               className="mb-5 ml-1 hidden w-fit cursor-pointer items-center gap-2 rounded-md border border-gray-700 bg-background-secondary px-2 py-1 shadow-md xl:flex"
               onClick={props.onToggleMenu}
            >
               <IoMdClose className="text-xl md:text-2xl 2xl:text-3xl" />
            </motion.button>

            {sidebarItems.map((item) => (
               <motion.div key={item.id} {...btnClick}>
                  <MenuItemCard path={item.path} name={item.name} icon={item.icon} />
               </motion.div>
            ))}
         </ul>
      </section>
   )
}

export default RightSideBar
{
}
