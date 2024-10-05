import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../../store/store"
import { setTab, TradeType } from "../../../store/tradeSlice"
import { motion } from "framer-motion"
import { btnClick } from "../../../animations"

const TradeTabSelector: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { selectedTrade } = useSelector((state: RootState) => state.trade)

   const handleTabClick = (tab: TradeType) => {
      dispatch(setTab(tab))
   }
   return (
      <section className="flex gap-5 px-2 text-text-secondary">
         <motion.button {...btnClick} onClick={() => handleTabClick("market")} className={`${selectedTrade === "market" ? "text-yellow" : ""}`}>
            Market
         </motion.button>
         <motion.button {...btnClick} onClick={() => handleTabClick("limit")} className={`${selectedTrade === "limit" ? "text-yellow" : ""}`}>
            Limit
         </motion.button>
         <motion.button {...btnClick} onClick={() => handleTabClick("trigger")} className={`${selectedTrade === "trigger" ? "text-yellow" : ""}`}>
            Trigger
         </motion.button>
      </section>
   )
}

export default TradeTabSelector
