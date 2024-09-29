import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../store/store"
import { setTab, TradeType } from "../../store/tradeSlice"

const TradeTabSelector: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { selectedTrade } = useSelector((state: RootState) => state.trade)

   const handleTabClick = (tab: TradeType) => {
      dispatch(setTab(tab))
   }

   return (
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
   )
}

export default TradeTabSelector
