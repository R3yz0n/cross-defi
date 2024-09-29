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
      <section className="flex justify-around  mb-4">
         <h2
            onClick={() => handleOrderType("buy")}
            className={`text-base 2xl:text-lg hover:brightness-125 hover:bg-background-tertiary hover:text-green font-medium py-2
               w-full text-center cursor-pointer transition-all duration-300 border-b-[3px]  pb-1 ${
                  orderType === "buy" ? "border-green text-green bg-background-tertiary" : "border-text-secondary"
               }`}
         >
            Buy
         </h2>
         <h2
            onClick={() => handleOrderType("sell")}
            className={`text-base 2xl:text-lg hover:brightness-125 hover:text-red hover:bg-background-tertiary font-medium py-2 
               w-full text-center cursor-pointer transition-all duration-300 border-b-[3px]  pb-1 ${
                  orderType === "sell" ? "border-red text-red bg-background-tertiary" : "border-text-secondary"
               }`}
         >
            Sell
         </h2>
      </section>
   )
}

export default OrderTypeSelector
