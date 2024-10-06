import { ReactNode } from "react"
import { btnClick } from "../../animations"
import { NavLink } from "react-router-dom"

interface MenuItemCardProps {
   name: string
   icon: ReactNode
   path: string
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ name, icon, path }) => {
   return (
      <NavLink
         {...btnClick}
         to={path}
         className={({ isActive }) =>
            `flex cursor-pointer gap-2 rounded-md px-3 py-3 shadow transition-all duration-200 ease-in-out hover:bg-background-secondary ${isActive ? "border-l-4 border-l-yellow bg-background-secondary" : "border-b-2 border-gray-700"}`
         }
      >
         <h2 className="text-text text-2xl">{icon}</h2>
         <h4 className="">{name}</h4>
      </NavLink>
   )
}

export default MenuItemCard
