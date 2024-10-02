import React from "react"

interface IOrderTabSelector {
   selectedTab: string
   onSelectTab: (tab: string) => void
}

const OrderTabSelector: React.FC<IOrderTabSelector> = ({ selectedTab, onSelectTab }) => {
   return (
      <aside className="flex gap-2 space-x-4 border-b-2 border-gray-700 text-15px font-medium text-text-secondary 2xl:text-base">
         <button
            onClick={() => onSelectTab("openOrders")}
            className={`relative -mb-0.5 p-2 pl-3 ${selectedTab === "openOrders" ? "border-b-2 border-yellow text-text-primary" : ""}`}
         >
            Open Orders
         </button>
         <button
            onClick={() => onSelectTab("orderHistory")}
            className={`-mb-0.5 p-2 ${selectedTab === "orderHistory" ? "border-b-2 border-yellow text-text-primary" : ""}`}
         >
            Order History
         </button>
         <button
            onClick={() => onSelectTab("assets")}
            className={`-mb-0.5 p-2 ${selectedTab === "assets" ? "border-b-2 border-yellow text-text-primary" : ""}`}
         >
            Assets
         </button>
      </aside>
   )
}

export default OrderTabSelector
