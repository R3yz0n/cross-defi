import { motion } from "framer-motion"
import React from "react"
import { btnClick } from "../../../../animations"
import { findTokenBySymbol } from "../../../../utils/tokens"

interface IOrderHistory {
   triggerToken: string
   tokenToBuy: string
   orderTime: string
   side: string
   avgFill: number
   orderAmount: number
   status: "filled" | "cancelled"
}

const OrderHistory: React.FC = () => {
   return (
      <section className="min-w-full max-w-[98%] overflow-y-scroll px-2 md:w-full md:px-0 md:pl-5">
         <div className="max-h-64 w-full overflow-y-auto">
            <table className="min-w-full table-auto text-left">
               <thead>
                  <tr className="sticky top-0 z-20 whitespace-nowrap bg-background-primary text-13px font-bold sm:text-sm">
                     <th className="w-1/6 px-2 py-3">Trigger Token</th>
                     <th className="w-1/6 px-2 py-3">Token To Buy</th>
                     <th className="w-1/6 px-2 py-3">Side</th>
                     <th className="w-1/6 px-2 py-3">Avg. Fill</th>
                     <th className="w-1/6 px-2 py-3">Order Amount</th>
                     <th className="w-1/6 px-2 py-3">Status</th>
                     <th className="w-[5%] px-2 py-3">
                        <button className="">Actions</button>
                     </th>
                  </tr>
               </thead>
               <tbody className="overflow-y-auto">
                  {orderHistory.map((orderHistory, index) => (
                     <tr key={index} className="whitespace-nowrap text-xs text-text-primary sm:text-sm 2xl:text-15px">
                        {/* Trigger Token with icon */}
                        <td className="px-2 py-3">
                           <div className="flex items-center gap-2">
                              <img
                                 className="h-5 w-5 sm:h-6 sm:w-6"
                                 src={findTokenBySymbol(orderHistory?.triggerToken)?.logo_url}
                                 alt={orderHistory.triggerToken}
                              />
                              {orderHistory?.triggerToken}
                           </div>
                        </td>

                        {/* Token to Buy with icon */}
                        <td className="px-2 py-3">
                           <div className="flex items-center gap-2">
                              <img
                                 className="h-5 w-5 sm:h-6 sm:w-6"
                                 src={findTokenBySymbol(orderHistory?.tokenToBuy)?.logo_url}
                                 alt={orderHistory.tokenToBuy}
                              />
                              {orderHistory?.tokenToBuy}
                           </div>
                        </td>

                        {/* Side */}
                        <td className="px-2 py-3">
                           {orderHistory?.side === "Buy" ? <span className="text-green">Buy</span> : <span className="text-red">Sell</span>}
                        </td>

                        {/* Avg. Fill */}
                        <td className="px-2 py-3 text-[0.9em] text-text-secondary">$ {orderHistory?.avgFill.toLocaleString()}</td>

                        {/* Order Amount */}
                        <td className="px-2 py-3 text-[0.9em] text-text-secondary">{orderHistory?.orderAmount.toLocaleString()} USDT</td>

                        {/* filled or cancell status */}
                        <td className="px-2 py-3 text-[0.8em]">
                           {orderHistory?.status === "filled" && (
                              <span className="rounded-sm bg-green bg-opacity-10 px-2 py-1 text-green">Filled</span>
                           )}
                           {orderHistory?.status === "cancelled" && (
                              <span className="rounded-sm bg-red bg-opacity-10 px-2 py-1 text-red">Cancelled</span>
                           )}
                        </td>
                        {/* Cancel button */}
                        <td className="px-2 py-3">
                           <motion.button
                              {...btnClick}
                              className="text-red-500 rounded bg-background-secondary px-3 py-0.5 text-[0.9em] shadow-md hover:text-yellow"
                           >
                              Details
                           </motion.button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   )
}

export default OrderHistory

const orderHistory: IOrderHistory[] = [
   {
      triggerToken: "ETH",
      tokenToBuy: "BTC",
      orderTime: "12:30 PM",
      side: "Buy",
      avgFill: 2400.5, // Changed to number
      orderAmount: 200,
      status: "filled",
   },
   {
      triggerToken: "BTC",
      tokenToBuy: "ETH",
      orderTime: "1:00 PM",
      side: "Sell",
      avgFill: 30000.0, // Changed to number
      orderAmount: 2001,
      status: "cancelled",
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0, // Changed to number
      orderAmount: 12,
      status: "filled",
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0, // Changed to number
      orderAmount: 12,
      status: "filled",
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0, // Changed to number
      orderAmount: 12,
      status: "cancelled",
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0, // Changed to number
      orderAmount: 12,
      status: "filled",
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0, // Changed to number
      orderAmount: 12,
      status: "cancelled",
   },
]

// TO DO equity not available  / available
