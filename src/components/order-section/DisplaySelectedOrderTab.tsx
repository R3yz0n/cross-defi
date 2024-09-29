import React from "react"
import OpenOrders from "./tabs/OpenOrders"

interface IDisplaySelectedOrderTab {
   selectedTab: string
}

const DisplaySelectedOrderTab: React.FC<IDisplaySelectedOrderTab> = ({ selectedTab }) => {
   return (
      <aside className="mt-4">
         {selectedTab === "openOrders" && <OpenOrders />}
         {selectedTab === "orderHistory" && <div>Order History Content</div>}
         {selectedTab === "assets" && <div>Assets Content</div>}
      </aside>
   )
}

export default DisplaySelectedOrderTab
