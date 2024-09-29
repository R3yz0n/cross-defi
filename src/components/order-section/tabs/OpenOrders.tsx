import React from "react"
import { findTokenBySymbol } from "../../../utils/tokens"

interface IOpenOrder {
   triggerToken: string
   tokenToBuy: string
   orderTime: string
   side: string
   avgFill: string
   orderAmount: number
}

const OpenOrders: React.FC = () => {
   return (
      <section title="sushant" className=" md:px-4 md:pl-6  max-w-full overflow-x-scroll  md:overflow-x-auto   px-1  ">
         <ul className="overflow-auto w-max md:w-full ">
            <li>
               <ol className="flex gap-5  justify-between text-11px  sm:text-xs 2xl:text-sm font-bold mb-4">
                  <li className="w-1/6">Trigger&nbsp;Token</li>
                  <li className="w-1/6">Token&nbsp;To&nbsp;buy</li>
                  <li className="w-1/6">Order&nbsp;Time</li>
                  <li className="w-1/6">Side</li>
                  <li className="w-1/6">Avg.&nbsp;Fill</li>
                  <li className="w-1/6">Order&nbsp;Amount</li>
                  <li className="w-20">
                     <button className="text-yellow">Cancel&nbsp;all</button>
                  </li>
               </ol>
            </li>

            {/* Mapped list of orders */}
            {openOrders.map((openOrder, index) => (
               <li key={index} className="">
                  <ol className="flex justify-between   text-xs sm:text-13px  2xl:text-15px  text-text-primary mb-2 mt-6">
                     {/* Trigger Token with icon */}
                     <li className="w-1/6 flex items-center gap-2">
                        <img
                           className="h-4 w-4 sm:w-6 sm:h-6"
                           src={findTokenBySymbol(openOrder?.triggerToken)?.logo_url}
                           alt={openOrder.triggerToken}
                        />
                        {openOrder?.triggerToken}
                     </li>

                     {/* Token to Buy with icon */}
                     <li className="w-1/6 flex items-center gap-2">
                        <img className="h-4 w-4 sm:w-6 sm:h-6" src={findTokenBySymbol(openOrder?.tokenToBuy)?.logo_url} alt={openOrder.tokenToBuy} />
                        {openOrder?.tokenToBuy}
                     </li>

                     {/* Order Time */}
                     <li className="w-1/6">{openOrder?.orderTime}</li>

                     {/* Side */}
                     <li className="w-1/6">
                        {openOrder?.side === "Buy" ? <span className="text-green">Buy</span> : <span className="text-red">Sell</span>}
                     </li>

                     {/* Avg. Fill */}
                     <li className="w-1/6">$ {openOrder?.avgFill}</li>

                     {/* Order Amount */}
                     <li className="w-1/6">{openOrder?.orderAmount} USDT</li>

                     {/* Cancel button */}
                     <li className="w-20">
                        <button className="text-red-500 bg-background-tertiary shadow-md px-3 py-0.5 rounded">Cancel</button>
                     </li>
                  </ol>
               </li>
            ))}
         </ul>
      </section>
   )
}

export default OpenOrders

const openOrders: IOpenOrder[] = [
   {
      triggerToken: "ETH",
      tokenToBuy: "BTC",
      orderTime: "12:30 PM",
      side: "Buy",
      avgFill: "2400.50",
      orderAmount: 200,
   },
   {
      triggerToken: "BTC",
      tokenToBuy: "ETH",
      orderTime: "1:00 PM",
      side: "Sell",
      avgFill: "30000.00",
      orderAmount: 2001,
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: "150.00",
      orderAmount: 12,
   },
]
