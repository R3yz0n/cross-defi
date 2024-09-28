import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../store/store"
import { setTab, setOrderType, TradeType, OrderType } from "../../store/tradeSlice"

import SelectTradeTab from "./SelectTradeTab"

const Trade: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { selectedTrade, orderType } = useSelector((state: RootState) => state.trade)

   const handleTabClick = (tab: TradeType) => {
      dispatch(setTab(tab))
   }

   const handleOrderType = (type: OrderType) => {
      dispatch(setOrderType(type))
   }

   return (
      <div>
         {/* Buy/Sell Order Type Selector */}

         <section className="flex justify-around  mb-4">
            <h2
               onClick={() => handleOrderType("buy")}
               className={`text-base 2xl:text-lg hover:brightness-125 hover:bg-background-tertiary hover:text-green  font-medium py-2
                   w-full text-center cursor-pointer transition-all duration-300 border-b-[3px]  pb-1 ${
                      orderType === "buy" ? "border-green text-green  bg-background-tertiary" : "border-text-secondary"
                   }`}
            >
               Buy
            </h2>
            <h2
               onClick={() => handleOrderType("sell")}
               className={`text-base 2xl:text-lg hover:brightness-125 hover:text-red hover:bg-background-tertiary font-medium py-2 
                  w-full text-center  cursor-pointer transition-all duration-300 border-b-[3px]  pb-1 ${
                     orderType === "sell" ? "border-red text-red bg-background-tertiary " : "border-text-secondary"
                  }`}
            >
               Sell
            </h2>
         </section>

         {/* Trade Type Tab Selector */}
         <section className="flex px-2 gap-5 text-text-secondary">
            <button onClick={() => handleTabClick("market")} className={`${selectedTrade === "market" ? "text-yellow" : ""}`}>
               Market
            </button>
            <button onClick={() => handleTabClick("limit")} className={`${selectedTrade === "limit" ? "text-yellow" : ""}`}>
               Limit
            </button>
            <button onClick={() => handleTabClick("trigger")} className={`${selectedTrade === "trigger" ? "text-yellow" : ""}`}>
               Trigger
            </button>
         </section>

         {/* Display Form Based on Selected Tab and Buy/Sell */}

         <SelectTradeTab selectedTrade={selectedTrade} orderType={orderType} />
      </div>
   )
}

export default Trade
