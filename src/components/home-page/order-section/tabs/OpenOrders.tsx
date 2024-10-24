import { motion } from "framer-motion"
import React, { useState } from "react"
import { btnClick } from "../../../../animations"
import { findTokenByAddress, findTokenByAggregator, findTokenBySymbol } from "../../../../utils/tokens"
import { useAccount, useReadContract } from "wagmi"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import { multiTokenKeeperFactoryAddress } from "../../../../constants/blockchain"
import multiTokenKeeperAbi from "../../../../services/blockchain/abis/multiTokenKeeper"
import { orderManagerAbi } from "../../../../services/blockchain/abis/orderManagerAbi"

interface IOpenOrder {
   triggerToken: string
   tokenToBuy: string
   orderTime: string
   side: string
   avgFill: number
   orderAmount: number
}
const OpenOrders: React.FC = () => {
   const { address, isConnected, chainId } = useAccount()

   const [openOrders, setOpenOrders] = useState<IOpenOrder[]>([])

   const { data: multiTokenKeeper } = useReadContract({
      abi: multiTokenKeeperFactoryAbi.abi as any,
      address: multiTokenKeeperFactoryAddress,
      functionName: "getMultiTokenKeeper",
      args: isConnected ? [address] : undefined,
   })

   const { data: orderManager } = useReadContract({
      abi: multiTokenKeeperAbi.abi as any,
      address: multiTokenKeeper,
      functionName: "orderManager",
      args: [],
   })

   const { data: activeOrders } = useReadContract({
      abi: orderManagerAbi as any,
      address: orderManager,
      functionName: "getActiveOrders",
      args: [],
   })

   // Check if activeOrders is loaded and has data
   const orders = activeOrders ? (activeOrders as any) : []
   console.log(activeOrders)

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
                     <th className="w-[5%] px-2 py-3">
                        <motion.button {...btnClick} className="text-yellow hover:text-red">
                           Cancel all
                        </motion.button>
                     </th>
                  </tr>
               </thead>
               <tbody className="overflow-y-auto">
                  {orders.map((openOrder, index) => (
                     <tr key={index} className="whitespace-nowrap text-xs text-text-primary sm:text-sm 2xl:text-15px">
                        {/* Trigger Token with icon */}
                        <td className="px-2 py-3">
                           <div className="flex items-center gap-2">
                              <img
                                 className="h-5 w-5 sm:h-6 sm:w-6"
                                 src={findTokenByAggregator(openOrder?.priceFeed)?.logo_url}
                                 alt={openOrder.triggerToken}
                              />
                              {findTokenByAggregator(openOrder?.priceFeed)?.name}
                           </div>
                        </td>

                        {/* Token to Buy with icon */}
                        <td className="px-2 py-3">
                           <div className="flex items-center gap-2">
                              <img
                                 className="h-5 w-5 sm:h-6 sm:w-6"
                                 src={findTokenByAddress(openOrder?.token)?.logo_url}
                                 alt={openOrder.tokenToBuy}
                              />
                              {findTokenByAddress(openOrder?.token)?.name}
                           </div>
                        </td>

                        {/* Side */}
                        <td className="px-2 py-3">
                           {openOrder?.side === "Buy" ? <span className="text-green">Buy</span> : <span className="text-red">Sell</span>}
                        </td>

                        {/* Avg. Fill */}
                        <td className="px-2 py-3 text-[0.9em] text-text-secondary">${openOrder?.priceThreshold.toString()}</td>

                        {/* Order Amount */}
                        <td className="px-2 py-3 text-[0.9em] text-text-secondary">{openOrder?.amount.toString()} USDT</td>

                        {/* Cancel button */}
                        <td className="px-2 py-3">
                           <motion.button
                              {...btnClick}
                              className="text-red-500 rounded bg-background-secondary px-3 py-0.5 text-[0.9em] shadow-md hover:bg-red"
                           >
                              Cancel
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

export default OpenOrders

const openOrders: IOpenOrder[] = [
   {
      triggerToken: "ETH",
      tokenToBuy: "BTC",
      orderTime: "12:30 PM",
      side: "Buy",
      avgFill: 2400.5,
      orderAmount: 200,
   },
   {
      triggerToken: "BTC",
      tokenToBuy: "ETH",
      orderTime: "1:00 PM",
      side: "Sell",
      avgFill: 30000.0,
      orderAmount: 2001,
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0,
      orderAmount: 12,
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0,
      orderAmount: 12,
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0,
      orderAmount: 12,
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0,
      orderAmount: 12,
   },
   {
      triggerToken: "SOL",
      tokenToBuy: "ADA",
      orderTime: "2:15 PM",
      side: "Buy",
      avgFill: 150.0,
      orderAmount: 12,
   },
]

// TO DO equity not available  / available
