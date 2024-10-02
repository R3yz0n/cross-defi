import React from "react"

interface IOrderTabSelector {
   selectedTab: string
   setSelectedTab: (tab: string) => void
}

const OrderTabSelector: React.FC<IOrderTabSelector> = ({ selectedTab, setSelectedTab }) => {
   return (
      <aside className="flex text-15px 2xl:text-base space-x-4 gap-2 border-gray-700 border-b-2  font-medium text-text-secondary">
         <button
            onClick={() => setSelectedTab("openOrders")}
            className={`p-2 pl-3 relative -mb-0.5 ${selectedTab === "openOrders" ? "border-yellow border-b-2 text-text-primary" : ""}`}
         >
            Open Orders
         </button>
         <button
            onClick={() => setSelectedTab("orderHistory")}
            className={`p-2 -mb-0.5 ${selectedTab === "orderHistory" ? "border-yellow border-b-2 text-text-primary" : ""}`}
         >
            Order History
         </button>
         <button
            onClick={() => setSelectedTab("assets")}
            className={`p-2 -mb-0.5 ${selectedTab === "assets" ? "border-yellow text-text-primary border-b-2" : ""}`}
         >
            Assets
         </button>
      </aside>
   )
}

export default OrderTabSelector
