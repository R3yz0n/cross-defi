import React, { useState } from "react"
import OrderTabs from "./OrderTabs"
import DisplaySelectedOrderTab from "./DisplaySelectedOrderTab"

const Order: React.FC = () => {
   const [selectedTab, setSelectedTab] = useState("openOrders")

   return (
      <section title="Order.tsx" className="h-[330px] px-0.5">
         {/* Order Type Tab Selector (open orders order history , assests)*/}
         <OrderTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
         {/* Display Lists Based on Selected Tab like (open orders order history , assests) */}
         <DisplaySelectedOrderTab selectedTab={selectedTab} />
      </section>
   )
}

export default Order
