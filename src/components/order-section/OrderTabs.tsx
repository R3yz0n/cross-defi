import { motion } from "framer-motion"
import React from "react"
import { btnClick } from "../../animations"

interface IOrderTabSelector {
   selectedTab: string
   onSelectTab: (tab: string) => void
}

const OrderTabSelector: React.FC<IOrderTabSelector> = ({ selectedTab, onSelectTab }) => {
   return (
      <aside className="flex gap-2 space-x-4 border-b-2 border-gray-700 text-15px font-medium text-text-secondary 2xl:text-base">
         <motion.button
            {...btnClick}
            onClick={() => onSelectTab("openOrders")}
            className={`relative p-2 pl-3 ${selectedTab === "openOrders" ? "border-b-2 border-yellow text-text-primary" : ""}`}
         >
            Open Orders
         </motion.button>
         <motion.button
            {...btnClick}
            onClick={() => onSelectTab("orderHistory")}
            className={`p-2 ${selectedTab === "orderHistory" ? "border-b-2 border-yellow text-text-primary" : ""}`}
         >
            Order History
         </motion.button>
         <motion.button
            {...btnClick}
            onClick={() => onSelectTab("assets")}
            className={`p-2 ${selectedTab === "assets" ? "border-b-2 border-yellow text-text-primary" : ""}`}
         >
            Assets
         </motion.button>
      </aside>
   )
}

export default OrderTabSelector
