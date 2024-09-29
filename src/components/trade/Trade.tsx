import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import DisplaySelectedTradeTab from "./DisplaySelectedTradeTab"
import TradeTabSelector from "./TradeTabSelector"
import OrderTypeSelector from "./OrderTypeSelector"

const Trade: React.FC = () => {
   const { selectedTrade, orderType } = useSelector((state: RootState) => state.trade)

   return (
      <>
         {/* Buy/Sell Order Type Selector */}
         <OrderTypeSelector />

         {/* Trade Type Tab Selector (market,limit and trigger) */}
         <TradeTabSelector />

         {/* Display Form Based on Selected Tab and Buy/Sell */}
         <DisplaySelectedTradeTab selectedTrade={selectedTrade} orderType={orderType} />
      </>
   )
}

export default Trade
