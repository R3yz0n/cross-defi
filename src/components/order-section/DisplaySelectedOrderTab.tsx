import React from "react"
import OpenOrders from "./tabs/OpenOrders"
import OrderHistory from "./tabs/OrderHistory"
import Assests from "./tabs/Assests"

interface IDisplaySelectedOrderTab {
   selectedTab: string
}

const DisplaySelectedOrderTab: React.FC<IDisplaySelectedOrderTab> = ({ selectedTab }) => {
   return (
      <aside className="mt-4">
         {selectedTab === "openOrders" && <OpenOrders />}
         {selectedTab === "orderHistory" && <OrderHistory />}
         {selectedTab === "assets" && <Assests />}
      </aside>
   )
}

export default DisplaySelectedOrderTab
