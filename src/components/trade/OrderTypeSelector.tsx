import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "../../store/store"
import { setOrderType, OrderType } from "../../store/tradeSlice"

const OrderTypeSelector: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { orderType } = useSelector((state: RootState) => state.trade)

   const handleOrderType = (type: OrderType) => {
      dispatch(setOrderType(type))
   }

   return (
      <section className="mb-4 flex justify-around">
         <h2
            onClick={() => handleOrderType("buy")}
            className={`w-full cursor-pointer border-b-[3px] py-2 pb-1 text-center text-sm font-medium transition-all duration-300 hover:bg-background-secondary hover:text-green hover:brightness-125 md:text-base 2xl:text-lg ${
               orderType === "buy" ? "border-green bg-background-secondary text-green" : "border-text-secondary"
            }`}
         >
            Buy
         </h2>
         <h2
            onClick={() => handleOrderType("sell")}
            className={`w-full cursor-pointer border-b-[3px] py-2 pb-1 text-center text-sm font-medium transition-all duration-300 hover:bg-background-secondary hover:text-red hover:brightness-125 md:text-base 2xl:text-lg ${
               orderType === "sell" ? "border-red bg-background-secondary text-red" : "border-text-secondary"
            }`}
         >
            Sell
         </h2>
      </section>
   )
}

export default OrderTypeSelector
